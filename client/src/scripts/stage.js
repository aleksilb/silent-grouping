import * as Server from './server'

export const Stage = {
    START: "start",
    COLLECTING: "collecting",
    GROUPING: "grouping",
    DONE: "done",
    WAITING: "waiting"
}

export function getChecker(changeFunction) {
    return new StageChecker(changeFunction)
}

class StageChecker {
    POLL_INTERVAL = 2000;
    pollTimer;
    voterStage;
    stageChange;

    constructor(stageChange) {
        this.stageChange = stageChange;
    }

    async checkForStageChange(voterId) {
        const currentStage = await this.checkVoterStage(voterId);
        if(currentStage !== this.voterStage) {
            this.stageChange(currentStage);
            this.voterStage = currentStage;
            if(currentStage === Stage.WAITING) {
                this.setPolling(voterId);
            }
            return true;
        } else {
            return false;
        }
    }

    async checkVoterStage(voterId) {
        const voter = await Server.getVoter(voterId);
        const groupingStage = await this.getGroupingStage(voter.grouping);
        console.log(voter);
        if(groupingStage === Stage.COLLECTING && voter.items_sent) {
            return Stage.WAITING;
        }
        if(groupingStage === Stage.GROUPING && voter.positions_sent) {
            return Stage.WAITING;
        }
        return groupingStage;
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

    async waitForStageChange(voterId)  {
        if(await this.checkForStageChange(voterId)) {
            clearTimeout(this.pollTimer);
        } else {
            this.setPolling(voterId);
        }
    }

    setPolling(voterId) {
        this.pollTimer = setTimeout(() => this.waitForStageChange(voterId), this.POLL_INTERVAL);
    }
}
