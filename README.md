# Javascript Code Quiz

## The purpose of this project
Generate a timed quiz for user to test their capabilities. It also will store a score in the local storage for users to review.

------
## User Journey
When the user goes to this website, they will be prompted to view history scores and start the code quiz.

![](./asset/image/step1.PNG)

If the user clicks the highscore page without playing a game, the local storage of history data will be empty, and the user will be prompted to play one game first.

![](./asset/image/step2.PNG)

After the user goes back to the main page by clicking the back button, he/she can start the quiz game by clicking the start button, and the first question will show up.

![](./asset/image/step3.PNG)

The user will be able to click on one of the options, and the timer is running down from 20 to 0. If the user makes a wrong choice, the timer will be deducted by 5 seconds, and the user will not get any score for the question. The prompt will say 'wrong!' as well. 

![](./asset/image/step4.PNG)

If the user selects the correct answer, the prompt will say 'correct!,' and the user gets 10 scores. 

![](./asset/image/step5.PNG)

If the user runs out of time, the submit score prompt will automatically show up for the user to fill out.

![](./asset/image/step6.PNG)

Else, if the user did well, and finish all questions before the timer runs out, the remaining time will be added to the final score, and the submit score prompt will also show up.

![](./asset/image/step7.PNG)

After the user submits the score, he/she will go back to the main screen, and therefore can click the 'highscore' button to check the score history, or try again.

![](/asset/image/step8.PNG)

------
## Deployed Application
https://banbanleelee.github.io/JavascriptCodeQuiz/