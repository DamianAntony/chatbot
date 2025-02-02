// Gemini Chatbot
const typingform = document.querySelector(".input")
const chatList = document.querySelector(".chat-list")
const toggleButton=document.querySelector("#toggle_theme_button")



let usermessage = null;
const createmessageelement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add(...classes);
  div.innerHTML = content;
  return div;
}
const YOUR_API_KEY="AIzaSyAbZ493cC_n3J1qZJfu7kljAqarairWeno"

const apiUrl=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${YOUR_API_KEY}`


const localStorageData=()=>{
  const islightMode = (localStorage.getItem("themebutton")==="dark_mode");
 document.body.classList.toggle("light_mode",islightMode);
 toggleButton.innerText= islightMode?"dark_mode":"light_mode";
const savedChats = localStorage.getItem("savedChats")
// restore saved chats

  chatList.innerHTML = savedChats|| "";

  chatList.scrollTo(0,chatList.scrollHeight)
}


// localStorageData();


const showtypingtext=(text,textElement,incomingmessage)=>{
  textElement.innerHTML= "";

  // if (window.marked) {
  //   text = marked.parse(text);// for giving necessary spacing and all
  // }
  const words = text.split(' ');
  let currentindex=0;
 
  const typinginterval= setInterval(() => {
    textElement.innerHTML+=(currentindex===0?'':' ')+words[currentindex++]
    incomingmessage.querySelector('.icon').classList.add("hide")
    
    if(currentindex===words.length){
      clearInterval(typinginterval)
      localStorage.setItem("savedChats", chatList.innerHTML);
      incomingmessage.querySelector('.icon').classList.remove("hide")

    }
    chatList.scrollTo(0,chatList.scrollHeight)
  }, 75);
  

}

const copyContent=(copyBtn)=>{
  const textcontent = copyBtn.parentElement.querySelector(".text").innerText;
  navigator.clipboard.writeText(textcontent)
  copyBtn.innerText="done";
  setTimeout(() => {
    copyBtn.innerText="content_copy"
  }, 1000);

}


const getApiResponse= async (incomingmessage)=>{
const textElement = incomingmessage.querySelector(".text");
try {
  const response = await fetch(apiUrl,{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({
      contents:[{
        parts:[{
          text:usermessage
        }]
      }]
    })

  })

  const data=await response.json();
  const apiresponse= data.candidates[0].content.parts[0].text;
  const formattedText = apiresponse
  .replace(/\*(?!\*)(.*?)\*/g, '$1') // Remove single asterisks but keep **bold**
  .replace(/\n/g, '<br>')            // Convert newlines to <br> for HTML rendering
  .replace(/\s+/g, ' ');
  console.log(data)
  console.log(apiresponse);
  showtypingtext(formattedText,textElement,incomingmessage);


}catch(error){
  console.log(error);
  
}finally{
  incomingmessage.classList.remove("loading")
}


}

const showloadinganimation=()=>{
  const html = `   <div class="message-incoming">
          <img src="./images/gemini.svg" alt="user-image" class="avatar">
          <p class="text">
          </p>
          <div class="loading-list">
            <div class="loading-bar"></div>
            <div class="loading-bar"></div>
            <div class="loading-bar"></div>
          </div>
        </div>
        <span class="icon material-symbols-rounded" onclick="copyContent(this)">content_copy</span>`;
  const incomingmessage = createmessageelement(html, "message","loading");
 
  chatList.appendChild(incomingmessage);
  getApiResponse(incomingmessage);
  chatList.scrollTo(0,chatList.scrollHeight)
}


const handleoutgoingmessage = () => {
  usermessage = typingform.querySelector(".input-placeholder").value.trim();
  if (!usermessage) return;//return when no input in the form
  const html = `   <div class="message-outgoing">
        <img src="./images/user.jpg" alt="user-image" class="avatar">
        <p class="text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio laudantium tenetur fugit dolores. Cumque delectus, commodi earum quia id quod exercitationem doloribus itaque ea laborum voluptas officia maiores ad ducimus!
        </p>
      </div>`;
  const incomingmessage = createmessageelement(html, "message");
  incomingmessage.querySelector(".text").innerHTML = usermessage;
  chatList.appendChild(incomingmessage);

  typingform.reset();//clear input field
  setTimeout(showloadinganimation,500);

}

toggleButton.addEventListener("click",()=>{
const islightMode=document.body.classList.toggle("light_mode");
toggleButton.innerText= islightMode?"dark_mode":"light_mode";
localStorage.setItem("themebutton",islightMode?"dark_mode":"light_mode")
})
typingform.addEventListener("submit", (e) => {
  e.preventDefault();

  handleoutgoingmessage();

})