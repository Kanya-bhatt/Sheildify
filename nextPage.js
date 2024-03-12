document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#content').hidden = false;
      document.querySelector('#loaderGif').hidden = true;
  
    document.getElementById('prediction').addEventListener('click', function() {
      document.querySelector('#content').hidden = true;
      document.querySelector('#loaderGif').hidden = false;
      fetch('http://127.0.0.1:5000/predict')
          .then((response) => {
            response.json()

            console.log(response)
            document.querySelector('#content').hidden = false;
            document.querySelector('#loaderGif').hidden = true;
            
            
          })
          .then((data) => {

            document.getElementById('outcome').innerHTML = 'The prediction is done.'
            console.log('success')
            
            async function newFunction() {
              await new Promise(resolve => setTimeout(resolve, 3000));
              window.location.href = './SpamOrHam.html'
            }
    
            newFunction()
          
            
            
          })
          .catch(()=>{
            console.log("hello")
          });

        });
    });