<template>
  <div class="crossword-game">
    <div class="crossword-questions">
      <h3>Horizontal</h3>
      <ul>
        <li v-for="(question, index) in horizontalQuestions" :key="index" :class="{ crossed: solvedQuestions.horizontal.includes(index) }">
          {{ index + 1 }}. {{ question }}
        </li>
      </ul>
      <h3>Vertical</h3>
      <ul>
        <li v-for="(question, index) in verticalQuestions" :key="index" :class="{ crossed: solvedQuestions.vertical.includes(index) }">
          {{ index + 1 }}. {{ question }}
        </li>
      </ul>
    </div>
    <table class="crossword-grid">
      <tr v-for="(row, rowIndex) in crossword" :key="rowIndex">
        <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="crossword-cell">
          <input
              v-if="cell"
              v-model="userInput[rowIndex][cellIndex]"
              maxlength="1"
              @input="handleInput($event, rowIndex, cellIndex)"
          />
        </td>
      </tr>
    </table>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const crossword = ref([
  [true, true, false, true, true],
  [false, true, true, true, false],
  [true, true, false, true, true],
  [false, true, true, true, false],
  [true, true, false, true, true],
]);

const correctWords = {
  horizontal: ['HI', 'CAT', 'DOG'],
  vertical: ['HOT', 'ICE']
};

const horizontalQuestions = ['A greeting', 'Small pet', 'Another pet'];
const verticalQuestions = ['High temperature', 'Frozen water'];

const userInput = ref(crossword.value.map(row => row.map(cell => (cell ? '' : null))));
const solvedQuestions = ref({
  horizontal: [],
  vertical: []
});
const message = ref('');

function handleInput(event, rowIndex, cellIndex) {
  const value = event.target.value.toUpperCase();
  userInput.value[rowIndex][cellIndex] = value;

  const nextCell = event.target.nextElementSibling;
  if (nextCell && nextCell.tagName === 'INPUT') {
    nextCell.focus();
  }

  checkCorrectness(rowIndex, cellIndex);
}

function checkCorrectness(rowIndex, cellIndex) {
  const userWordHorizontal = userInput.value[rowIndex].join('');
  const userWordVertical = userInput.value.map(row => row[cellIndex]).join('');

  if (correctWords.horizontal.includes(userWordHorizontal)) {
    solvedQuestions.value.horizontal.push(horizontalQuestions.indexOf(userWordHorizontal));
    message.value = 'Correct horizontal word!';
  } else if (correctWords.vertical.includes(userWordVertical)) {
    solvedQuestions.value.vertical.push(verticalQuestions.indexOf(userWordVertical));
    message.value = 'Correct vertical word!';
  } else {
    message.value = 'Incorrect word, try again.';
  }

  setTimeout(() => {
    message.value = '';
  }, 2000);
}
</script>

<style scoped>
.crossword-game {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  background-color: #f9f9f9;
}

.crossword-questions {
  margin-right: 20px;
}

.crossword-questions .crossed {
  text-decoration: line-through;
  color: green;
}

.crossword-grid {
  border-collapse: collapse;
}

.crossword-cell {
  width: 40px;
  height: 40px;
  border: 1px solid #000;
  text-align: center;
}

.crossword-cell input {
  width: 100%;
  height: 100%;
  text-align: center;
  border: none;
  outline: none;
  font-size: 1.5em;
  text-transform: uppercase;
}

.message {
  margin-top: 20px;
  font-size: 1.2em;
  color: blue;
}
</style>