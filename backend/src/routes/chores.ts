import express from "express";
import type { OnDemandChore } from "../models/chore";

const router = express.Router();

let chores: OnDemandChore[] = [
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
  const newChore: OnDemandChore = {
    ...req.body,
    id: Date.now().toString(), // generate unique ID
    triggered: false,
    triggeredAt: "",
    alertCount: 0,
    alertRecipients: [],
  };

  chores.push(newChore);
  res.status(201).json(newChore);
});

export default router;
