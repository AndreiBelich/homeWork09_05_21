"use strict";

const submitButton = document.querySelector("#submitButton");
const cancelButton = document.querySelector("#cancelButton");
const mainForm = document.querySelector(".main-content-form");
const articleTitle = document.querySelector("#articleTitle");
const contentField = document.querySelector("#contentField");
const postsContainer = document.querySelector("#userPostsContainer");
const addArticleButton = document.querySelector(".add-article-button");
const searchField = document.querySelector(".header-search-field");
const userPosts = [];

mainForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = articleTitle.value.trim();
  const content = contentField.value.trim();
  if(!title || !content){
    return;
  }
  const tempObject = {
    title: title,
    content: content,
    publishingDate: getCurrentDate()
  }
  userPosts.push(tempObject);
  clearForm();
  postsContainer.appendChild(createArticle(tempObject));
  showOrHideForm();
});

addArticleButton.addEventListener("click", showOrHideForm);

cancelButton.addEventListener("click", showOrHideForm);

searchField.addEventListener("input", ({target}) => {
  const currentValue = target.value.toLowerCase();
  const posts = postsContainer.querySelectorAll("article.user-article");
  for(const post of posts){
    const title = post.querySelector(".article-title-wrapper > h2").innerText.toLowerCase();
    if(!currentValue.length){
      post.style.display = "flex";
      continue;
    }

    if(title.indexOf(currentValue) < 0){
      /*
      Не работает, в отладчике показывает что свойство display flex
      не изменяется на display none, хотя другие свойства возможно изменить
      post.classList.add("hidden-element");
      */
      post.style.display = "none";
    }else{
      //post.classList.remove("hidden-element");
      post.style.display = "flex";
    }
  }
});

function showOrHideForm(){
  mainForm.classList.toggle("hidden-element");
  addArticleButton.classList.toggle("hidden-element");
}

function createArticle({title, content, publishingDate}){
  return createElement(
    "article", 
    {
      classNames: ["user-article"]
    },
    createArticleHeader(title, publishingDate),
    createElement(
      "p",
      {
        classNames: ["article-content"]
      },
      document.createTextNode(content)
    )
  );
}

function createArticleHeader(title, date){
  return createElement(
    "div",
    { 
      classNames: ["article-title-wrapper"] 
    },
    createElement(
      "h2",
      {
        classNames: ["article-title"]
      },
      document.createTextNode(title)
    ),
    createElement(
      "p", 
      {
        classNames: ["article-publishing-date"]
      },
      document.createTextNode(date)
    )
  );
}


function getCurrentDate(){
  const currentDate = new Date();
  return `${getCorrectDayNumber(currentDate.getDate())}.${getCorrectDayNumber(currentDate.getMonth() + 1)}.${currentDate.getFullYear()}`;
}

function getCorrectDayNumber(number){
  return number < 10 ? "0" + number : number;
}

function clearForm(){
  articleTitle.value = "";
  contentField.value = "";
}