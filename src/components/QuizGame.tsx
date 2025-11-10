import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, RotateCcw } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Who has scored the most runs in Test cricket history?",
    options: ["Sachin Tendulkar", "Ricky Ponting", "Jacques Kallis", "Brian Lara"],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "Which country won the first Cricket World Cup in 1975?",
    options: ["Australia", "England", "West Indies", "India"],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "What is the maximum number of overs in a One Day International (ODI)?",
    options: ["40", "50", "60", "20"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "Who holds the record for the fastest century in ODI cricket?",
    options: ["Corey Anderson", "AB de Villiers", "Chris Gayle", "Shahid Afridi"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Which bowler has taken the most wickets in Test cricket?",
    options: ["Shane Warne", "Anil Kumble", "Muttiah Muralitharan", "James Anderson"],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: "In which year did T20 cricket make its international debut?",
    options: ["2003", "2005", "2007", "2009"],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "What is the term for a bowler taking three wickets in three consecutive balls?",
    options: ["Triple strike", "Hat-trick", "Perfect over", "Three-fer"],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "Which stadium is known as the 'Home of Cricket'?",
    options: ["MCG", "Lord's", "Eden Gardens", "The Oval"],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Who was the first batsman to score 400 runs in a Test innings?",
    options: ["Brian Lara", "Matthew Hayden", "Virender Sehwag", "Don Bradman"],
    correctAnswer: 0,
  },
  {
    id: 10,
    question: "How many players are there in a cricket team?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 1,
  },
];

type GameState = "start" | "playing" | "finished";

export default function QuizGame() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const startGame = () => {
    setGameState("playing");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameState("finished");
      }
    }, 1500);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (gameState === "start") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 md:p-12 text-center shadow-2xl border-2">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 tracking-tight">
              Cricket Quiz
            </h1>
            <p className="text-xl text-muted-foreground">
              Test your cricket knowledge!
            </p>
          </div>
          <div className="mb-8 text-foreground/80">
            <p className="text-lg mb-2">🏏 10 exciting questions</p>
            <p className="text-lg mb-2">🎯 Multiple choice answers</p>
            <p className="text-lg">🏆 Challenge yourself!</p>
          </div>
          <Button
            onClick={startGame}
            size="lg"
            className="text-lg px-8 py-6 bg-accent hover:bg-accent/90"
          >
            Start Quiz
          </Button>
        </Card>
      </div>
    );
  }

  if (gameState === "finished") {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 md:p-12 text-center shadow-2xl border-2">
          <Trophy className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Quiz Complete!
          </h2>
          <div className="mb-8">
            <p className="text-6xl font-bold text-accent mb-2">
              {score}/{questions.length}
            </p>
            <p className="text-xl text-muted-foreground">
              {percentage >= 80
                ? "Outstanding! You're a cricket expert! 🌟"
                : percentage >= 60
                ? "Great job! You know your cricket! 👏"
                : percentage >= 40
                ? "Good effort! Keep learning! 📚"
                : "Keep practicing! You'll improve! 💪"}
            </p>
          </div>
          <Button
            onClick={startGame}
            size="lg"
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-6 md:p-8 shadow-2xl border-2">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-primary">
              Score: {score}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          {question.question}
        </h3>

        <div className="grid gap-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrect = showResult && isCorrect;
            const showIncorrect = showResult && isSelected && !isCorrect;

            return (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                variant="outline"
                className={`
                  w-full p-6 text-left text-lg font-medium transition-all duration-300
                  ${showCorrect ? "bg-success text-success-foreground border-success" : ""}
                  ${showIncorrect ? "bg-destructive text-destructive-foreground border-destructive" : ""}
                  ${!showResult && !isSelected ? "hover:bg-accent/10 hover:border-accent" : ""}
                `}
              >
                <span className="mr-3 font-bold text-accent">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
