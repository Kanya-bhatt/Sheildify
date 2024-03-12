document.addEventListener('DOMContentLoaded', function () {
  var element = document.getElementById('body');
  // document.getElementById('loaderGif').classList.add('hidden');
  var video = document.getElementById("myVideo");
  // var homepage = document.getElementById("hello");
  var homePageLogin = document.getElementById("homePageLogin");
  // Play the video
  homePageLogin.style.display = "none";
  video.play();

  // Set a timeout to pause the video after a certain duration (in milliseconds)
  var duration = 3000; // 5 seconds
  setTimeout(function() {
    homePageLogin.style.display = "block";
    video.style.display = "none"; // Hide the video

  }, duration);

  


  var img = document.getElementById("loaderGif");
  img.style.display = "none";
  document.getElementById('content').classList.remove('hidden');
  function checkFileExists(url) {
    return fetch(url, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          return true;
        } else {
          return false;
        }
      })
  }loginAgain = document.getElementById('login_again')

  const url = './gmail_token.json';
  checkFileExists(url)
    .then(exists => {
      if (exists) {
        document.getElementById('yourButton').innerHTML = 'Fetch'
        // document.getElementById('login_again').classList.remove('hidden');
        loginAgain.style.display = "inline"

      }
      else {
        document.getElementById('yourButton').innerHTML = 'Login and Fetch'

      loginAgain.style.display = "none"
      }
    })
    .catch(error => {
      document.getElementById('yourButton').innerHTML = 'Login'
   
      loginAgain.style.display = "none";
      // document.getElementById('login_again').classList.add('hidden');


    });




  document.getElementById('yourButton').addEventListener('click', function () {
    // var days = document.getElementById('counter-value').value
    var days = document.getElementById('counter-value').textContent;
    console.log(days)
    
  
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            var activeTab = tabs[0];
            currentUrl = activeTab.url;
            
           
      
        

            console.log("Current URL: ", currentUrl);

    function generatingResults() {
      document.getElementById('homePageLogin').classList.add('hidden');

      img.style.display = "inline";

      fetch(`http://127.0.0.1:5000/execute-script?days=${days}&currentUrl=${currentUrl}`)
        .then((response) => {
          response.json()
          // document.getElementById('reMessage').innerHTML = 'FETCHED!';
          
          img.style.display = "none";
          // document.getElementById('loaderGif').classList.add('hidden');
          document.getElementById('homePageLogin').classList.remove('hidden');
          async function newFunction() {
            // await new Promise(resolve => setTimeout(resolve, 3000));
            window.location.href = './nextPage.html'
          }

          newFunction()
          return response.json()
        }
        )
        .then((data) => {
          console.log(data)


        })
        .catch((error) => {
          console.log(error)
        });





    }

    if (navigator.onLine) {
      generatingResults();
    }
    else {
      document.getElementById('fileData').innerHTML = 'NO ACTIVE INTERNET CONNECTION'
    }
  });

  });
  document.getElementById('login_again').addEventListener('click', function () {
    //write the code to delete a file called gmail_token.json
    fetch('http://127.0.0.1:5000/deleteFile', {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {

          console.log('File deleted successfully.');
        } else {

          console.log('Failed to delete file.');
        }
      })
      .catch(error => {

        console.error('Error:', error);
      });
      var days = document.getElementById('counter-value').textContent;
      console.log(days)
      
    
          chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
              var activeTab = tabs[0];
              currentUrl = activeTab.url;
              
             
        
          
  
              console.log("Current URL: ", currentUrl);
  
      function generatingResults() {
        document.getElementById('homePageLogin').classList.add('hidden');
  
        img.style.display = "inline";
  
        fetch(`http://127.0.0.1:5000/execute-script?days=${days}&currentUrl=${currentUrl}`)
          .then((response) => {
            response.json()
            // document.getElementById('reMessage').innerHTML = 'FETCHED!';
            
            img.style.display = "none";
            // document.getElementById('loaderGif').classList.add('hidden');
            document.getElementById('homePageLogin').classList.remove('hidden');
            async function newFunction() {
              // await new Promise(resolve => setTimeout(resolve, 3000));
              window.location.href = './nextPage.html'
            }
  
            newFunction()
            return response.json()
          }
          )
          .then((data) => {
            console.log(data)
  
  
          })
          .catch((error) => {
            console.log(error)
          });
  
  
  
  
  
      }
  
      if (navigator.onLine) {
        generatingResults();
      }
      else {
        document.getElementById('fileData').innerHTML = 'NO ACTIVE INTERNET CONNECTION'
      }
    });
  


  });

  let counter = 1;

  const counterValue = document.getElementById('counter-value');
  const incrementBtn = document.getElementById('increment-btn');
  const decrementBtn = document.getElementById('decrement-btn');
  const resetBtn = document.querySelector('#reset');


  incrementBtn.addEventListener('click', () => {
    counter++;
    counterValue.innerHTML = counter;
  });

  decrementBtn.addEventListener('click', () => {
    if (counter >= 2)
      counter--;
    counterValue.innerHTML = counter;
  });


  resetBtn.addEventListener('click', reset);

  function reset() {
    counter = 1;
    counterValue.innerHTML = counter;
  }






});


