;(function myModule(){

  let n = 50;

  main();

  function main(){
    initListeners();
  }

  function initListeners(){
    process.on('beforeExit', (code)=>{
      handleExit();
    });
  }

  function handleExit(){
    (n--) 
      ? setTimeout(()=>{
          console.log(n);
        })
      : 0;
  }

})();