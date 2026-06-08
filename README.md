# 1RM

Estimate your one-rep max from any set. Supports Epley, Brzycki, and Lombardi formulas with hover descriptions.

## Run

```bash
pip install -r requirements.txt
python app.py
```

Open http://localhost:5000/ in a browser.

## Notes

- Estimates only — actual 1RM depends on form, fatigue, and the lift.
- The three formulas diverge past 10 reps; the hover tooltip explains the tradeoff.
