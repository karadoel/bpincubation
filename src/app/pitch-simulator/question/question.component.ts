import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsData } from '../in-memory-data/questions-data';
import { Question } from '../interfaces/question';
import { Tip } from '../interfaces/tip';
import { QuestionService } from '../services/question/question.service';
import { TipService } from '../services/tip/tip.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})

// const TIME_LIMIT:number = 15;
export class QuestionComponent implements OnInit {
  static GREEN: string = '#daffd0';
  static AMBER: string = '#fff2cb';
  static LIGHT_RED: string = '#ffd4d4';
  static RED: string = '#ffb0b0';

  timer: number = 15;
  question: Question | undefined;
  id: number = 1;
  timerStarted: boolean = false;
  timeLeft = this.timer;
  timeUp: boolean = false;
  timerID: any;
  backgroundColor: string = QuestionComponent.GREEN;
  isTimerAutomatic: boolean = false;
  audience: string = 'investors';
  tipId: number = 1;
  tip: Tip | undefined;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private tipService: TipService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getQuestion();
  }

  getQuestion(): void {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
      this.audience = params['audience'];

      this.validateQuestionAndTip();

      this.questionService
        .getQuestion(this.id, this.audience)
        .subscribe((question) => (this.question = question));
      this.tipService
        .getTip(this.tipId, this.audience)
        .subscribe((tip) => (this.tip = tip));

      if (this.isTimerAutomatic) {
        this.startTimer();
      }
    });
  }

  private validateQuestionAndTip(): void {
    let totalQuestions =
      this.audience === 'investors'
        ? QuestionsData.INVESTOR_QUESTIONS.length
        : QuestionsData.CUSTOMER_QUESTIONS.length;
    this.id %= totalQuestions;
    if (this.id == 0) {
      this.id = 1;
    }

    let totalTips =
      this.audience === 'investors'
        ? QuestionsData.INVESTOR_TIPS.length
        : QuestionsData.CUSTOMER_TIPS.length;
    this.tipId = this.id % totalTips;
    if (this.tipId == 0) {
      this.tipId = 1;
    }
  }

  startTimer(): void {
    console.log('Timer started');
    this.reset();
    this.timerStarted = true;
    this.tiktok();
  }

  @HostListener('window:keydown.space', ['$event'])
  restartTimer(event: KeyboardEvent): void {
    event.preventDefault();
    console.log('Timer restarted');
    if (!this.timeUp) clearTimeout(this.timerID);
    this.startTimer();
  }

  @HostListener('window:keydown.enter', ['$event'])
  nextQuestion(event: KeyboardEvent): void {
    event.preventDefault();
    this.reset();
    let nextQuestionId = this.id + 1;
    this.router.navigate(['../', nextQuestionId], { relativeTo: this.route });
  }

  toggleTimerMode() {
    this.isTimerAutomatic = !this.isTimerAutomatic;

    if (this.isTimerAutomatic) {
      this.startTimer();
    } else {
      this.timerStarted = false;
    }
  }

  private tiktok(): void {
    console.log('entered tiktok');
    this.setBackgroundColor();
    this.timerID = setTimeout(() => {
      this.timeLeft -= 1;
      if (this.timeLeft > 0) {
        this.tiktok();
      } else {
        this.timeUp = true;
        this.setBackgroundColor();
      }
    }, 1000);
  }

  private setBackgroundColor(): void {
    if (this.timeLeft >= (this.timer * 2) / 3) {
      this.backgroundColor = QuestionComponent.GREEN;
    } else if (this.timeLeft >= this.timer / 3) {
      this.backgroundColor = QuestionComponent.AMBER;
    } else if (this.timeLeft > 0) {
      this.backgroundColor = QuestionComponent.LIGHT_RED;
    } else {
      this.backgroundColor = QuestionComponent.RED;
    }
  }

  private reset(): void {
    this.timeUp = false;
    this.timeLeft = this.timer;
    this.timerStarted = false;
    clearTimeout(this.timerID);
  }
}
