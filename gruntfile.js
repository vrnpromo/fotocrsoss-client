module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			main: {
				options: {
					browserifyOptions: {
						debug: true
					},
					transform: [['babelify', {presets: ["es2015"]} ]] //{presets: ["stage-1", "es2015"]}
				},
				src: 'src/app.js',
				dest: 'scripts/app.min.js'
			}
		},
		watch: {
			files: [ 'src/**/*.js' ],
			tasks: ['browserify'],
			options: {
				spawn: false,
			},
		},
		connect: {
			target:{
				options: {
					port: 9001
				}
			}
		},
		bower: {
			flat: {
				dest: 'scripts',
				options: {
					debugging: true
				}
			}
		},
		uglify: {
		    my_target: {
		      files: {
		        'scripts/app.min.js': ['scripts/app.min.js']
		      }
		    }
		  }
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('main-bower-files');

	grunt.registerTask('default', [ 'connect', 'watch']); //'bower'
	grunt.registerTask('deploy', [ 'browserify', 'uglify']);
};