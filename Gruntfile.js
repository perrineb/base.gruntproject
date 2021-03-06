var LIVERELOAD_PORT = 35729,
  lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT}),
  path = require('path'),
  config, mountFolder;

mountFolder = function (connect, dir) {
  return connect.static(path.resolve(dir));
};

config = {
  app: './'
};

module.exports = function (grunt) {
  
  timestamp = new Date();
  
  require('load-grunt-tasks')(grunt);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    compass: {
        dev: { 
            options: {
                sassDir: 'src/sass',
                cssDir: 'public/css'
            }
        }
    },

    autoprefixer: {
        options: {
            browsers: ['last 2 version', 'ie 8', 'ie 9']
        },
        no_dest: {
            src: ['public/css/libs.css', 'public/css/main.css']
        },
    },
    
    // concat_css: {
    //   options: {},
    //   all: {
    //     // src: ["/**/*.css"],
    //     src: [
    //       // 'src/js/libs/fullPage.js/jquery.fullPage.css', 
    //       // 'src/js/libs/multiscroll.js/jquery.multiscroll.css'
    //     ],
    //     dest: 'public/css/libs.css'
    //   }
    // },



    imagemin: {
        dev: {
            options: {
                optimizationLevel: 0,
                progressive: true
            },
            files: [{
                expand: true,
                cwd: 'src/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'public/'
            }]
        },
        build: {
            options: {
                optimizationLevel: 4,
                progressive: true
            },
            files: [{
                expand: true,
                cwd: 'src/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'public/'
            }]
        },
        dist: {
            options: {
                optimizationLevel: 7,
                progressive: true
            },
            files: [{
                expand: true,
                cwd: 'src/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'dist/public/'
            }]
        }
    },


    copy: {
      dist: {
        files: [
          // includes files within path and its sub-directories
          { 
            expand: false, 
            src: ['public/fonts/**'], 
            dest: 'dist/public/fonts/'
          },
          { 
            expand: false, 
            src: ['public/index.html'], 
            dest: 'dist/public/index.html'
          },
          { 
            expand: false, 
            src: ['public/js/lib/modernizr-custom.js'], 
            dest: 'dist/public/js/lib/modernizr-custom.js'
          }
        ],
      },
    },


    modernizr: {
        dist: {
            // [REQUIRED] Path to the build you're using for development.
            "devFile" : "node_modules/grunt-modernizr/lib/modernizr-dev.js",

            // Path to save out the built file.
            "outputFile" : "public/js/lib/modernizr-custom.js",

            // Based on default settings on http://modernizr.com/download/
            "extra" : {
                "shiv" : true,
                "printshiv" : false,
                "load" : true,
                "mq" : false,
                "cssclasses" : true
            },

            // Based on default settings on http://modernizr.com/download/
            "extensibility" : {
                "addtest" : false,
                "prefixed" : false,
                "teststyles" : false,
                "testprops" : false,
                "testallprops" : false,
                "hasevents" : false,
                "prefixes" : false,
                "domprefixes" : false,
                "cssclassprefix": ""
            },

            // By default, source is uglified before saving
            "uglify" : true,

            // Define any tests you want to implicitly include.
            "tests" : [],

            // By default, this task will crawl your project for references to Modernizr tests.
            // Set to false to disable.
            "parseFiles" : true,

            // When parseFiles = true, this task will crawl all *.js, *.css, *.scss and *.sass files,
            // except files that are in node_modules/.
            // You can override this by defining a "files" array below.
            // "files" : {
                // "src": []
            // },

            // This handler will be passed an array of all the test names passed to the Modernizr API, and will run after the API call has returned
            // "handler": function (tests) {},

            // When parseFiles = true, matchCommunityTests = true will attempt to
            // match user-contributed tests.
            "matchCommunityTests" : false,

            // Have custom Modernizr tests? Add paths to their location here.
            "customTests" : []
        }

    },

    watch: {
      options: {
        livereload: true
      },

      compass: {
        files: 'src/sass/**/*',
        spawn: true,
        tasks: ['compass:dev']
      },

      sourcejs: {
        files: 'src/js/**/*',
        spawn: true,
        tasks: ['concat:js']
      },

      livereload: {
        files: ['*.js', '*.css', '**/*.html']
      }
    },

    open: {
        server: {
            path: 'http://localhost:<%= connect.options.port %>/public'
        }
    },

    concat: {
      lib: {
        src: [
          'src/js/libs/jquery/jquery-1.11.1.min.js',
          'src/js/libs/underscore-min.js',
          'src/js/libs/velocity/velocity.js', 
          'src/js/libs/hammer.js/jquery.hammer-full.min.js',
          'src/js/libs/jquery/plugins/jquery-mousewheel/jquery.mousewheel.js'
        ],
        dest: 'public/js/lib.js'
      },
      ie: {
        src: [
          'src/js/libs/ie/html5.js',
          'src/js/libs/ie/respond.src.js'
        ],
        dest: 'public/js/ie.js'
      },
      js: {
        src: [
          'src/js/app/*.js'
        ],
        dest: 'public/js/application.js'
      },
      alljs: {
        src: [
          'public/js/lib.js',
          'public/js/application.js'
        ],
        dest: 'public/js/javascripts.js'
      }
    },

    uglify: {
      build: {
        files: [
          {src: 'public/js/application.js', dest: 'public/js/application.min.js'},
          {src: 'public/js/lib.js', dest: 'public/js/lib.min.js'},
          {src: 'public/js/ie.js', dest: 'public/js/ie.min.js'},
          // {src: 'public/js/javascripts.js', dest: 'public/js/javascripts.min.js'}
        ],
      },
      dist: {
        files: [
          {src: 'public/js/application.js', dest: 'dist/public/js/application.min.js'},
          {src: 'public/js/lib.js', dest: 'dist/public/js/lib.min.js'},
          {src: 'public/js/ie.js', dest: 'dist/public/js/ie.min.js'},
          // {src: 'public/js/javascripts.js', dest: 'dist/public/js/javascripts.min.js'}
        ],
      },
    },


    // https://www.npmjs.org/package/grunt-replace
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match : /css\/main\.css/g,
              replacement: 'css/main.min.css'
            },
            {
              match : /js\/application\.js/g,
              replacement: 'js/application.min.js'
            },
            {
              match : /js\/lib\.js/g,
              replacement: 'js/lib.min.js'
            },
            {
              match : /js\/ie\.js/g,
              replacement: 'js/ie.min.js'
            }
          ]
        },
        files: [
          {expand: false, flatten: false, src: ['public/index.html'], dest: 'dist/public/index.html'}
        ]
      }
    },


    cssmin: {
        combine: {
            files: {
                'public/css/main.min.css': ['public/css/main.css'],
                // 'public/css/libs.min.css': ['public/css/libs.css']
            }
        },
        dist: {
            files: {
                'dist/public/css/main.min.css': ['public/css/main.css'],
                // 'dist/public/css/libs.min.css': ['public/css/libs.css']
            }
        }
    },
    

    connect: {
      options: {
        port: 8000,
        hostname: 'localhost'
      },

      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, config.app)
            ];
          }
        }
      }
    },


    compress: {
      dist: {
        options: {
          archive: 'dist/zip/deliver_'+ timestamp.getFullYear() + timestamp.getMonth() + timestamp.getDate() + timestamp.getHours() + timestamp.getMinutes() + timestamp.getSeconds() +'.zip'
        },
        files: [
          {src: ['dist/public/**']}  // includes files in path and its subdirs
        ]
      }
    }

  });

 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks("grunt-modernizr");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'imagemin:dev',
      // 'copy:main',
      'compass',
      // 'concat_css',
      'autoprefixer',
      'modernizr:dist',
      'concat:ie',
      'concat:js',
      'concat:lib',
      'concat:ie',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    // 'copy:main', 
    'compass', 
    'autoprefixer', 
    'cssmin:combine', 
    'modernizr:dist', 
    'concat:ie', 
    'concat:js', 
    'concat:lib', 
    'concat:alljs', 
    'uglify:build', 
    'imagemin:build'
    ]);

  // le index.html doit avoir le lien vers les fichiers minifiés pour que le résultat fonctionne
  grunt.registerTask('dist', [
    'copy:dist',
    'cssmin:dist',
    'uglify:dist',
    'imagemin:dist',
    'replace:dist',
    'compress:dist',
    ]);
}
