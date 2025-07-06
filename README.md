
# 🏠 Flatmates – AI-Powered Chore Manager

Flatmates is not just another chore app — it’s your intelligent housemate. Powered by AI, Flatmates learns from how your group actually behaves: who finishes their chores, who delays, who prefers what, and when people are most active.

Then it uses that knowledge to assign tasks fairly, adaptively, and naturally — whether through smart rotation, personalized recommendations, or simple voice commands like “I finished the bathroom.”
With AI at its core, Flatmates turns shared living into smooth living — no arguments, no repeats, no hassle.

## 🚀 Key Features

### 🔧 1. Task Assignment Optimization (Recommendation System)
- Assigns tasks based on user history, reliability, preferences, and fairness
- Uses ranking models and reinforcement learning to continuously improve assignments

### 🔁 2. Chore Rotation Smartness (Adaptive System)
- Dynamically rotates chores based on who skipped, who’s overloaded, and who’s consistent
- Avoids overburdening reliable members and encourages participation

### 📥 3. Natural Language Interface (Chatbot / Voice Assistant)
- Voice or chat-based commands like:
  - “Who has kitchen duty today?”
  - “Assign me a quick chore”
- Powered by Whisper (speech-to-text) and GPT (natural language understanding)

### 📊 4. Habit Scoring & Behavior Modeling
- Tracks how consistently each member completes tasks
- Creates behavioral scores that influence task assignment and rotation
- Clusters users into types (e.g., consistent, occasional, inactive)

### 🖼️ 5. Voice & Image Command Support
- Users can say “done with trash” to mark a task complete
- Upload task images (e.g., clean kitchen) to verify via image classification
- Models: Whisper for voice, MobileNet/ResNet or CLIP for vision

---

## 🧠 Why Flatmates is Different

> “It learns from your housemates’ actions and adapts accordingly.”

- Not just a scheduler — a smart assistant
- Behavior-aware task rotation
- Natural and friendly interaction
- Fair, flexible, and intelligent automation

---

## 🛠️ Tech Stack

| Feature                      | Technology                              |
|-----------------------------|------------------------------------------|
| Backend                     | Node.js / Express + MongoDB              |
| ML/RL Models                | Python (Scikit-learn, PyTorch, SB3)      |
| Voice Command               | Whisper (API or local)                   |
| Image Classification        | MobileNet / ResNet / CLIP                |
| Chatbot                     | OpenAI GPT / LangChain                   |
| Frontend                    | React + Tailwind CSS                     |

---

## 📂 Folder Structure (Suggested)

```
flatmates/
├── backend/
│   ├── models/
│   ├── routes/
│   └── controllers/
├── ai/
│   ├── assignment_model/
│   ├── chore_rotation_rl/
│   ├── speech/
│   └── vision/
├── frontend/
│   └── src/
└── README.md
```

---

## 📈 Future Ideas

- Gamification & Rewards
- Emotion-aware notifications
- Auto-suggesting chore schedules based on forecast
- AI-powered conflict resolution

---

## 🤝 Contributing

We welcome contributions! Whether it's core logic, AI models, or UI improvements — feel free to fork the repo and open a pull request.

---

## 📜 License

MIT License

---

## 🙌 Built by *Rajashekar Mudigonda*

Bringing AI into daily life — one chore at a time.
