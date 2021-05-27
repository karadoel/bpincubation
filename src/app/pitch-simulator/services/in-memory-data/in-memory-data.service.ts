import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { QuestionsData } from '../../in-memory-data/questions-data';
import { Question } from '../../interfaces/question';
import { Tip } from '../../interfaces/tip';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const questions_investors = this.formatQuestionsData(
      QuestionsData.INVESTOR_QUESTIONS
    );
    const questions_customers = this.formatQuestionsData(
      QuestionsData.CUSTOMER_QUESTIONS
    );

    const tips_investors = this.formatTipsData(QuestionsData.INVESTOR_TIPS);
    const tips_customers = this.formatTipsData(QuestionsData.CUSTOMER_TIPS);

    return {
      questions_investors,
      questions_customers,
      tips_investors,
      tips_customers,
    };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(questions: Question[]): number {
    return questions.length > 0
      ? Math.max(...questions.map((question) => question.id)) + 1
      : 11;
  }

  private formatQuestionsData(questionsArray: Array<string>): Array<Question> {
    let questions: Array<Question> = [];
    let id = 1;
    questionsArray.forEach((questionText) => {
      questions.push({
        id: id++,
        question: questionText,
      });
    });
    return questions;
  }

  private formatTipsData(tipsArray: Array<string>): Array<Tip> {
    let tips: Array<Tip> = [];
    let id = 1;
    tipsArray.forEach((tipText) => {
      tips.push({
        id: id++,
        tip: tipText,
      });
    });
    return tips;
  }
}
