import * as Server from './server'

export const Stage = {
    START: "start",
    COLLECTING: "collecting",
    GROUPING: "grouping",
    DONE: "done",
    WAITING: "waiting"
}

export function getChecker(voterId, changeFunction, waitFunction) {
    return new StageChecker(voterId, changeFunction, waitFunction)
}

class StageChecker {
    POLL_INTERVAL = 2000;
    pollTimer;
    voterId;
    voterStage;
    stageChange;

    constructor(voterId, stageChange) {
        this.voterId = voterId;
        this.stageChange = stageChange;
    }

    close() {
        if(this.pollTimer) {
            clearTimeout(this.pollTimer);
        }
    }

    async checkForStageChange() {
        const voter = await Server.getVoter(this.voterId);
        let currentStage = await this.getGroupingStage(voter.grouping);
        if(this.isWaiting(voter, currentStage)) {
            this.setPolling();
            currentStage = Stage.WAITING;
        }
        if(currentStage !== this.voterStage) {
            this.voterStage = currentStage;
            this.stageChange(currentStage);
        }
    }

    isWaiting(voter, stage) {
        return (stage === Stage.COLLECTING && voter.items_sent)
            || (stage === Stage.GROUPING && voter.positions_sent);
    }

    async getGroupingStage(groupingId) {
        const grouping = await Server.getGrouping(groupingId);
        switch (grouping.stage) {
            case "COLLECTING":
                return Stage.COLLECTING;
            case "GROUPING":
                return Stage.GROUPING;
            case "DONE":
                return Stage.DONE;
            default:
                return Stage.START;
        }
    }

    async waitForStageChange()  {
        await this.checkForStageChange();
        if(this.voterStage !== Stage.WAITING) {
            clearTimeout(this.pollTimer);
        }
    }

    setPolling() {
        this.pollTimer = setTimeout(() => this.waitForStageChange(), this.POLL_INTERVAL);
    }
}
