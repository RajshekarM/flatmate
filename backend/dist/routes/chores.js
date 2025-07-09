"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
let chores = [
    {
        id: "trash",
        name: "Take out Trash",
        lastAssignedTo: "Divya",
        triggered: false,
        triggeredAt: "",
        alertCount: 0,
        alertRecipients: [],
    },
];
// GET all chores
router.get("/", (req, res) => {
    res.json(chores);
});
// POST a new chore
router.post("/", (req, res) => {
    const newChore = Object.assign(Object.assign({}, req.body), { id: Date.now().toString(), triggered: false, triggeredAt: "", alertCount: 0, alertRecipients: [] });
    chores.push(newChore);
    res.status(201).json(newChore);
});
exports.default = router;
