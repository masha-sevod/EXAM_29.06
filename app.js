import express from "express";
import fileFilter from "./fileFilter.js";
// import supabaseService from "./supabaseService.js";

const app = express();

const PUBLIC_DIR = "public";
app.use(express.static(PUBLIC_DIR));
app.use(express.json());
app.get("/:id", (req, res) => {
  let id = Number(req.params["id"]);
  
  if (!id) {
    let error = {
      status: "error",
      message: "Неверный ID",
    };
    res.statusCode = 400;
    res.send(error);
    return;
  }

  let answer = {
    status: "ok",
    message: `Модель '${id}'`
  }
  
  res.statusCode = 400;
  res.send(answer);
})

app.post("/create", async (req, res) => {
	console.log(req.body)
  // if (!req.body?.name || !req.files[0]?.path) {
  //   let error = {
  //     status: "error",
  //     message: "Не хватает данных",
  //   };
    // res.statusCode = 400;
    // res.send(error);
    // return;

  // let recording = {
  //   name: req.body.name,
  //   description: req.body.description,
  //   favourites: req.body.favourites
  // };

  // let data = await supabaseService.addRecording(recording);

  // if (!data) {
  //   let error = {
  //     status: "error",
  //     message: "Ошибка при добавлении в базу данных",
  //   };
  //   res.statusCode = 400;
  //   res.send(error);
  //   return;
  // }

  // let answer = {
  //   status: "ok",
  //   data
  // };

  // res.statusCode = 200;
  // res.send(req.body);
});

app.put("/edit/:id", fileFilter, (req, res) => {
  let id = Number(req.params["id"]);

  if (!id) {
    let error = {
      status: "error",
      message: "Неверный ID",
    };
    res.statusCode = 400;
    res.send(error);
    return;
  }

  if (!req.body?.name || !req.files[0]?.path || !req.files[1]?.path) {
    let error = {
      status: "error",
      message: "Не хватает данных",
    };
    res.statusCode = 400;
    res.send(error);
    return;
  }

  let recording = {
    id: req.params["id"],
    name: req.body.name,
    description: req.body.description,
    favourites: req.body.favourites
  };

  let answer = {
    status: "ok",
    message: `Запись ${id} изменена`,
    data: recording,
  };

  res.statusCode = 200;
  res.send(answer);
});

app.delete("/delete/:id", (req, res) => {
  let id = Number(req.params["id"]);

  if (!id) {
    let error = {
      status: "error",
      message: "Неверный ID",
    };
    res.statusCode = 400;
    res.send(error);
    return;
  }

  let answer = {
    status: "ok",
    message: `Запись'${id}' удалена`
  }
  
  res.statusCode = 200;
  res.send(answer);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started at port ${port}`));
