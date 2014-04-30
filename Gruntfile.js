module.exports = function(grunt){

	require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);


    grunt.initConfig({
    	pkg : grunt.file.readJSON('package.json'),

    	//=======================
    	// BOWER 
    	//=======================
    	bower : {
    		install : {
    			options : {
    				targetDir : 'client/requires',
    				layout : 'byComponent'
    			}
    		}
    	},
    	//=======================
    	// CLEAN 
    	//=======================

    	clean : {
    		build : ['build'],
    		dev : {
    			src : ['build/app.js', 'build/<%= pkg.name %>.css', 'build/<%= pkg.name %>.js']
    		},
    		prod : ['dist']
    	},
    	//=======================
    	// BROWSERIFY
    	//=======================
        browserify: {
            vendor: {
                src: ['client/requires/**/*.js'],
                dest: 'build/vendor.js',
                options: {
                    shim: {
                        jquery: {
                            path: 'client/requires/jquery/js/jquery.js',
                            exports: '$'
                        },
                        underscore: {
                            path: 'client/requires/underscore/js/underscore.js',
                            exports: '_'
                        },
                        backbone: {
                            path: 'client/requires/backbone/js/backbone.js',
                            exports: 'Backbone',
                            depends: {
                                jquery : '$',
                                underscore: 'underscore'
                            }
                        }
                    }
                }
            },
            app: {
                files: {
                    'build/app.js': ['client/src/main.js']
                },
                options: {
                    transform: ['hbsfy'],
                    external: ['jquery', 'underscore', 'backbone']
                }
            },
            test : {


            }
        },
    	//=======================
    	// LESS
    	//=======================
    	less : {
    		transpile : {
    			files : {
    				'build/<%= pkg.name %>.css': [
    					'client/styles/reset.css',
    					'client/requires/*/css/*',
    					'client/styles/less/main.less'
    				]
    			}
    		}
    	},

    	//=======================
    	// CONCAT
    	//=======================
    	concat : {
    		'build/<%= pkg.name %>.js' : ['build/vendor.js', 'build/app.js']
    	},

    	//=======================
    	// COPY
    	//=======================

    	copy : {
    		dev : {
    			files : [{
    				src : 'build/<%= pkg.name %>.js',
    				dest : 'public/js/<%= pkg.name %>.js'
    			}, {
    				src : 'build/<%= pkg.name %>.css',
    				dest : 'public/css/<%= pkg.name %>.css'
    			},{
    				src : 'client/img/*',
    				dest : 'public/img/'
    			}]
    		},
    		prod : {
    			files : [{
    				src : ['client/img/*'],
    				dest : 'dist/img/'
    			}]
    		}
    	},

    	//=======================
    	// CSS MINIFICATION
    	//=======================

    	cssmin : {
    		minify : {
    			src : ['build/<%= pkg.name %>.css'],
    			dest : 'dist/css/<%= pkg.name %>.css'
    		}
    	},

    	//=======================
    	// JAVASCRIPT UGLIFY
    	//=======================
    	uglify : {
    		compile : {
    			options : {
    				compress : true,
    				verbose : true
    			},
    			files : [{
    				src : 'build/<%= pkg.name %>.js',
    				dest : 'dist/js/<%= pkg.name %>.js'
    			}]
    		}
    	},

    	//=======================
    	// WATCHER CLIENT CODE
    	//=======================
    	watch : {
    		scripts : {
    			files : ['client/templates/*.hbs', 'client/src/**/*.js'],
    			tasks : ['clean:dev', 'browserify:app', 'concat', 'copy:dev']
    		},
    		less : {
    			files : ['client/styles/**/*.less'],
    			tasks : ['less:transpile', 'copy:dev']
    		}
    	},

    	//=======================
    	// NODEMON 
    	//=======================

    	nodemon : {
    		dev : {
    			options : {
    				file : 'server.js',
    				watchedFolders : ['controllers', 'app'],
    				env : {
    					PORT : '3000'
    				}
    			}
    		}
    	},

    	//=======================
    	// CONCURRENT 
    	//=======================

    	concurrent : {
    		dev: {
                tasks: ['nodemon:dev', 'watch:scripts', 'watch:less'],
                options: {
                    logConcurrentOutput: true
                }
            }
    	},

    	//=======================
    	// JSHINT
    	//=======================
        jshint: {
            all: ['Gruntfile.js', 'client/src/**/*.js', 'client/spec/**/*.js'],
            dev: ['client/src/**/*.js'],
            test: ['client/spec/**/*.js']
        }
    });
	
	grunt.registerTask('init:dev', ['clean', 'bower', 'browserify:vendor']);

    grunt.registerTask('build:dev', ['clean:dev', 'browserify:app', 'browserify:test', 'jshint:dev', 'less:transpile', 'concat', 'copy:dev']);
    grunt.registerTask('build:prod', ['clean:prod', 'browserify:vendor', 'browserify:app', 'jshint:all', 'less:transpile', 'concat', 'cssmin', 'uglify', 'copy:prod']);

    grunt.registerTask('heroku', ['init:dev', 'build:dev']);

    grunt.registerTask('server', ['build:dev', 'concurrent:dev']);


};	

		