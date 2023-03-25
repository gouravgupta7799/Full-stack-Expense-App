
const Expense = require('../model/model');

exports.PostData = async (req, res, next) => {
  try {
    let ExpensePrice = req.body.ExpensePrice;
    let ExpenseCetogary = req.body.ExpenseCetogary;
    let ExpenseDescription = req.body.ExpenseDescription;

    let alredyExixt = await Expense.findOne({ where: { ExpenseDescription: ExpenseDescription } })
    if (alredyExixt) {
      return res.status(403).send('alredy exixt');
    } else {
      let exps = await Expense.create({
        ExpensePrice: ExpensePrice,
        ExpenseCetogary: ExpenseCetogary,
        ExpenseDescription: ExpenseDescription
      });
      res.status(200).send(exps);
    }
  }
  catch (err) {
    res.status(500).send(`${err.body}`)
  };
};


exports.GetData = async (req, res, next) => {
  try {
    let data = await Expense.findAll()
    res.send(data);
  }
  catch (err) {
    res.status(500).send(`${err.body}`)
  };
};


exports.DeleteData = async (req, res, next) => {
  try {
    let itemId = req.body.ExpenseDescription;
    let del = await Expense.destroy(
      { where: { ExpenseDescription: itemId } })
    res.send(`${del} deleted`)
  }
  catch (err) {
    res.status(500).send(`${err.body}`)
  }
}


exports.updateData = async (req, res, next) => {
  try {
    let ExpenseDescription = req.body.ExpenseDescription;
    let alredyExist = await Expense.findOne({ where: { ExpenseDescription: ExpenseDescription } })

    if (!alredyExist) { 
      return res.status(400).send('not exist')
    }

    if (alredyExist) {
      newPrice = req.body.ExpensePrice;
      newCetogary = req.body.ExpenseCetogary;
      newDescription = req.body.ExpenseDescription;

      let exps = await Expense.update(
        {
          ExpensePrice: newPrice,
          ExpenseCetogary: newCetogary,
        },
        { where: { ExpenseDescription: newDescription } }
      )
      res.send(exps)
    }
  }
  catch (err) {
    res.status(500).send(`${err.body}`)
  }
}