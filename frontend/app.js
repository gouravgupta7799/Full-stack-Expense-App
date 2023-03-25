
const url = 'http://localhost:4000'
let expenses = document.getElementById('expenses');
let description = document.getElementById('description');
let category = document.getElementById('cetogary');
let check = document.getElementById('autoSizingCheck');
let form = document.getElementById('form');
let items = document.getElementById('items');
let editform = document.getElementById('editform');
editform.style.display = 'none';

showItems();

//SHOW DATA FUNCTION
function showItems() {
  axios.get(url)
    .then(collection => {
      collection.data.forEach(function (i) {
        let li = document.createElement('li');
        let deletebtn = document.createElement('button');
        let editbtn = document.createElement('button');

        li.className = 'list-group-item';
        deletebtn.className = 'Delete btn btn-danger';
        editbtn.className = 'Edit btn btn-primary';

        li.innerText = `${i.ExpenseDescription} - ${i.ExpenseCetogary} - ${i.ExpensePrice}`;
        deletebtn.innerText = 'Delete';
        editbtn.innerText = 'Edit';

        li.appendChild(editbtn);
        li.appendChild(deletebtn);
        items.appendChild(li);
      });
    })
    .catch(err => { console.log(err) });
};


//ADD EXPENSES DATA TO DATA BASE (SQL)
form.addEventListener('submit', async () => {
  try {
    let data = JSON.stringify({
      "ExpensePrice": expenses.value,
      "ExpenseCetogary": category.value,
      "ExpenseDescription": description.value
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    await axios.request(config)
  }
  catch (err) {
    console.log(err);
  };
});


//DELETETING DATA FROM DB
items.addEventListener('click', async (e) => {
  try {
    if (e.target.classList.contains('Delete')) {
      let li = e.target.parentElement;
      let text = li.innerText;
      text = text.split(' - ');
      let ExpenseDescription = text[0];
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          'ExpenseDescription': ExpenseDescription
        })
      };
      let a = await axios.request(config)
      items.removeChild(li);
    };
  }
  catch (err) {
    console.log(err);
  };
});


//EDIT FUNCTION FOR DB
items.addEventListener('click', async (e) => {
  if (e.target.classList.contains('Edit')) {
    form.style.display = 'none';
    editform.style.display = 'block';
    items.style.display = 'none'

    let li = e.target.parentElement;
    text = li.innerText;
    text = text.split(' - ');
    let newText = text[0]
    let response = await axios.get(url)
    for (i of response.data) {
      if (i.ExpenseDescription === newText) {
        document.getElementById('editexpenses').value = i.ExpensePrice;
        document.getElementById('editdescription').value = i.ExpenseDescription;
        document.getElementById('editcetogary').value = i.ExpenseCetogary;
      }
    }
  }
});

editform.addEventListener('submit', async (e) => {
  let data = JSON.stringify({
    ExpensePrice: document.getElementById('editexpenses').value,
    ExpenseCetogary: document.getElementById('editcetogary').value,
    ExpenseDescription: document.getElementById('editdescription').value
  })
  console.log(data)
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  let a = await axios.request(config)
})