{
	$('a[href*="#"]:not([href="#"])').click(function(){
		if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target:$('[name='+this.hash.slice(1)+']');
			if(target.length){
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
}

{
	Vue.component('neko-item', {
		props: ['img', 'text'],
		template: `<section class="neko-item">
<div class="container">
	<div class="row">
		<div class="col-md-6 col-sm-6">
			<div class="info-left shake-little">
				<img v-bind:src=img>
			</div>
		</div>
		<div class="col-md-6 col-sm-6">
			<div class="info-right">
				<h2>Another head</h2>
				<p>{{text}}</p>
				<br>
				<a class="btn btn-default btn-lg" href="#">Read more</a>
			</div>
		</div>
	</div>
</div>
</section>`
	});

	new Vue({
		el: '#vue-app',
		data: {
			posts: [{
					img: 'img/img1.png',
					text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto ut provident dolorem omnis, dolorum optio rem sapiente suscipit culpa aut libero ipsa molestiae laboriosam eligendi consectetur dignissimos nobis inventore blanditiis.'
				}, {
					img: 'img/img2.jpeg',
					text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum hic cum sunt, culpa eligendi delectus amet autem neque aperiam suscipit voluptates fuga enim quisquam maxime consequatur ratione voluptas deserunt expedita.'
				}
			]
		}
	});
}