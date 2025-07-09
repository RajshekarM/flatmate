"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const chores_1 = __importDefault(require("./routes/chores"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const scheduler_1 = __importDefault(require("./routes/scheduler"));
const onDemandAssignment_1 = __importDefault(require("./routes/onDemandAssignment"));
const scheduledAssignment_1 = __importDefault(require("./routes/scheduledAssignment"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("🚀 Backend is up!");
});
app.use('/api/dashboard', dashboard_1.default);
app.use('/api/schedules', scheduler_1.default);
app.use('/api/chores', chores_1.default);
app.use('/api/timedSchdeuler', scheduledAssignment_1.default);
app.use('/app/onDemandChores', onDemandAssignment_1.default);
exports.default = app;
