 

 
// console.log('hello')
 const loadApi = (text,limit) => {
     // if(!search){
     //      return;
     // }
     const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`;
     fetch(url)
     .then(res => res.json())
     .then(data => showData(data.meals,limit))
 }
 const showData = (data , limit) => {
     // console.log(data)
    const card = document.getElementById('card-container');
    card.innerHTML = '';
    const seeAll = document.getElementById('seeAll');
          if(data === null){
               alert('Not Found')
          }else{
               if(limit && data.length > 5){
                    data = data.slice(0.6)
                    seeAll.classList.remove('d-none')

               }else{
                    seeAll.classList.add('d-none')
               }
          }
     data.forEach(element => {
          // console.log(element)
          card.innerHTML += `
          <div class="card mb-3 mx-4" style="max-width: 500px;">
               <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${element.strMealThumb}" class="img-fluid rounded-start" alt="...">
               </div>
               <div class="col-md-8">
                    <div class="card-body">
                         <h5 class="card-title">${element.strMeal}</h5>
                         <p class="card-text">${element.strInstructions.slice(0,250)}..</p>   
                         <button type="button" onclick="mealId('${element.idMeal}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> View Ditails</button>
                    </div>
               </div>
          </div>
          </div>
          `;
     });
 }
// getmeal id
 const mealId = (id) =>{
     console.log(id)
     const url2 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
     fetch(url2)
     .then(res => res.json())
     .then(data => showModal(data.meals[0]))
 }
//  show modal
  const showModal =(modal) =>{
     console.log(modal)
     document.getElementById('exampleModalLabel').innerText = modal.strMeal;
     const body = document.getElementById('modal-body');
     body.innerHTML += `
     
     <div class="card">
  <img src="${modal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <span class="text-info-emphasis">Area : ${modal.strArea}</span> <br/>
    <span class="text-info">Category : ${modal.strCategory}</span>
    <p class="card-text">${modal.strInstructions}</p>
    <a href="${modal.strYoutube}" class="btn btn-primary">Youtube</a>
  </div>
</div>
     `;
  }
    
 loadApi('rice')


 const searcField = (limit)=>{
     const input = document.getElementById('input-field');
     const text = input.value;
          loadApi(text,limit)
          input.value = ''; 
 }
  document.getElementById('search-btn').addEventListener('click',()=>{
     searcField(6)
  })
  document.getElementById('input-field').addEventListener('keyup',function(e){
     if(e.key === 'Enter'){
          searcField(6)
     }
  })