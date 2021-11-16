import * as Server from './server'

export const Stage = {
    START: "start",
    COLLECTING: "collecting",
    GROUPING: "grouping",
    DONE: "done",
    WAITING: "waiting"
}

export function getChecker(grouperId, changeFunction, waitFunction) {
    return new StageChecker(grouperId, changeFunction, waitFunction)
}

class StageChecker {
    POLL_INTERVAL = 2000;
    pollTimer;
    grouperId;
    grouperStage;
    stageChange;

    constructor(grouperId, stageChange) {
        this.grouperId = grouperId;
        this.stageChange = stageChange;
    }

    close() {
        if(this.pollTimer) {
            clearTimeout(this.pollTimer);
        }
    }

    async checkForStageChange() {
        const grouper = await Server.getGrouper(this.grouperId);
        let currentStage = await this.getGroupingStage(grouper.grouping.id);
        if(this.isWaiting(grouper, currentStage)) {
            this.setPolling();
            currentStage = Stage.WAITING;
        }
        if(currentStage !== this.grouperStage) {
            this.grouperStage = currentStage;
            this.stageChange(currentStage);
        }
    }

    isWaiting(grouper, stage) {
        return (stage === Stage.COLLECTING && grouper.items_sent)
            || (stage === Stage.GROUPING && grouper.positions_sent);
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
        if(this.grouperStage !== Stage.WAITING) {
            clearTimeout(this.pollTimer);
        }
    }

    setPolling() {
        this.pollTimer = setTimeout(() => this.waitForStageChange(), this.POLL_INTERVAL);
    }
}
