// Classes

class Budget {
     constructor(budget) {
       this.budget = Number( budget );
       this.budgetLeft = this.budget;
     }

     // Subtract from budget

     subtractFromBudget(amount) {
      return this.budgetLeft -= amount;

     }
}

// Everything HTML related here
class HTML{
      // Insert budget when user submits
      insertBudget(amount) {
       // Insert into HTML
       budgetTotal.innerHTML = `${amount}`;
       budgetLeft.innerHTML = `${amount}`;

      }


      // Displays message (correct or invalid)
      printMessage(message, className) {
         const messageWrapper = document.createElement('div');
         messageWrapper.classList.add('text-center', 'alert', className);
         messageWrapper.appendChild(document.createTextNode(message));

         // Insert into HTML

         document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

         // Clear the error/expense

         setTimeout(function() {
          document.querySelector ('.primary .alert').remove();
          addExpenseForm.reset();
         }, 3000);
              }

         // Displays the expenses from form into list

         addExpenseToList(name, amount) {
          const expensesList = document.querySelector('#expenses ul');


          // Create an li
          const li = document.createElement('li');
          li.className = "list-group-item d-flex justify-content-between align-items-center";

          // Create the template

          li.innerHTML = `
             ${name}
             <span class="badge badge-primary badge-pill">£ ${amount}   </span> `;

          // Insert into HTML

          expensesList.appendChild(li);
         }
       // Subtract expense amount from budget

       trackBudget(amount) {
        const budgetLeftPounds = budget.subtractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftPounds}`;


       // Check when 25% is spent

       if( (budget.budget / 4) > budgetLeftPounds ) {
        budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
        budgetLeft.parentElement.parentElement.classList.add('alert-danger');
       } else if( (budget.budget / 2) > budgetLeftPounds) {
        budgetLeft.parentElement.parentElement.classList.remove('alert-success');
        budgetLeft.parentElement.parentElement.classList.add('alert-warning');

       }
       }
}

// Variables

const addExpenseForm = document.querySelector('#add-expense'),
      budgetTotal = document.querySelector('span#total'),
      budgetLeft = document.querySelector ('span#left');

let budget, userBudget;

// Initiate HTML Class

const html = new HTML();

// Event Listeners

eventListeners();
function eventListeners() {

// App init
document.addEventListener('DOMContentLoaded', function() {

   // Ask the visitor their monthly budget
   userBudget = prompt(' What\'s your budget for this month? ');

   if(userBudget === null || userBudget === '' || userBudget === '0' ) {
      window.location.reload();
   } else {
     // If budget is valid then initialize budget class

      budget = new Budget(userBudget);

      // Initiate HTML Class
      html.insertBudget(budget.budget);

   }
});
 // When a new expense is added
 addExpenseForm.addEventListener('submit', function(e) {

  e.preventDefault();

   // Read values from budget form

   const expenseName = document.querySelector('#expense').value;
   const amount = document.querySelector('#amount').value;

   if(expenseName === '' || amount === '') {
    html.printMessage('Error: both fields are required.', 'alert-danger');
   } else {
    // Add expenses into list
    html.addExpenseToList(expenseName, amount);
    html.trackBudget(amount);
    html.printMessage('Added..', 'alert-success');
   }

 });
}