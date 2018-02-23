$(document).ready(()=>{
	$('#searchForm').on('submit',(e)=>{
		let searchText=$('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
});
//Fetching information from the API using Http Request
function getMovies(searchText){
	//Performing a get Request using Search - '?s'
	axios.get(' http://www.omdbapi.com/?s='+searchText+'&apikey=f351e7a6')
	.then((response)=>{
		console.log(response);
		let movies=response.data.Search;
		let output='';
		$.each(movies,(index,movie)=>{
			output+=`
				<div class="col-md-3">
					<div class="well text-center">
					<img src="${movie.Poster}">
					<h5>${movie.Title}</h5>
					<a class="btn btn-primary" onclick="movieSelected('${movie.imdbID}')"  href="#">Movie Details</a>
					
					</div>
				</div>
			`;
		});
		//Output the data to html 
		$('#movies').html(output);
	})
	.catch((err)=>{
		console.log();
	});
}
//Information about the selected Movie
function movieSelected(id){
	sessionStorage.setItem('movieId',id);
	window.location='movie.html';
	return false;

}
//Fetching the information from the API and storing it in session and output the response to html element
function getMovie(){
	let movieId=sessionStorage.getItem('movieId');
	//performing get request using index - '?i'
	axios.get(' http://www.omdbapi.com/?i='+movieId+'&apikey=f351e7a6')
	.then((response)=>{
		console.log(response);
		let movie=response.data;
		let output=`
			<div class="row">
				<div class="col-md-4">
					<img src="${movie.Poster}" class="thumbnail">
				</div>
				<div class="col-md-8">
					<h2>${movie.Title}</h2>
					<ul class="list-group">
						<li class="list-group"><strong>Genre</strong>${movie.Genre}</li>
						<li class="list-group"><strong>Released</strong>${movie.Released}</li>
						<li class="list-group"><strong>Rated</strong>${movie.Rated}</li>
						<li class="list-group"><strong>IMDB Rating</strong>${movie.imdbRating}</li>
						<li class="list-group"><strong>Director</strong>${movie.Director}</li>
						<li class="list-group"><strong>Writer</strong>${movie.Writer}</li>
						<li class="list-group"><strong>Actors</strong>${movie.Actors}</li>


					<ul>
				</div>
			</div>
			<div class="row">
				<div class=well>
					<h5>${movie.Plot}</h5>
					<hr>
					<a href="http://www.imdb.com/title/${movie.imdbID}" target="_blank"class="btn btn-primary">View IMDB</a>
					<a href="index.html" class="btn btn-success">Go Back to Search</a>
				</div>
			</div>
		`;
		$('#movie').html(output);
		
		$('#movies').html(output);
	})
	.catch((err)=>{
		console.log();
	});
}