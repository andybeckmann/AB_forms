// -- Grunt Boilerplate

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // -- SASS compilation using dart-sass

        'dart-sass': {
            target: {
                files: {
                    'css/main.css': 'scss/main.scss'
                }
            }
        },
        
        // -- CSS minification using cssmin

        cssmin: {
            combine: {
                files: {
                    'css/production.css': [
                        'css/main.css',
                    ]
                },
 
                options:{
                    report: 'min'
                }
            }
        },
        
        // -- JavScript hints using JSHint

        jshint: {
            options: {
                eqnull: true,
                eqeqeq: false,
                esversion: 6,
            },
            beforeconcat: ['js/plugins.js','js/scripts.js']
        },

        // -- JavaScript concatenation using concat

        concat: {   
            dist: {
                src: [
                    'js/plugins.js',
                    'js/scripts.js'
                ],
                dest: 'js/build/global.js',
            }
        },

        // -- JavaScript minification using Terser

        terser: {
            main: { 
                files: { 
                    'js/build/global.min.js': ['js/build/global.js'], 
                }
            }
        },

        // -- Watch

        watch: {
 
            scripts: {
                files: ['js/*.js'],
                tasks: ['jshint:beforeconcat','concat','terser'],
                options: {
                    spawn: false,
                }
            },
 
            css: {
                files: ['scss/*.scss','scss/**/*.scss','css/**/*.css'],
                tasks: ['dart-sass', 'cssmin'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    // -- Plugins

    require('load-grunt-tasks')(grunt);
 
    grunt.registerTask('default', ['jshint:beforeconcat','concat', 'terser', 'dart-sass', 'cssmin', 'watch']);
};