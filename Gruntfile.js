module.exports = function(grunt) {

  grunt.initConfig({
    copy: {
      main: {
        expand: true,
        cwd: '../master',
        src: '**',
        dest: 'app/widgets/nl.fokkezb.form/',
      },
    },
    clean: {
      main: ['app/widgets/nl.fokkezb.form']
    },
    titanium: {
      ipad: {
        options: {
          command: 'build',
          platform: 'ios',
          deviceFamily: 'ipad',
          logLevel: 'trace',
          shadow: true,
          sdk: '3.5.1.GA'
        }
      },
      iphone: {
        options: {
          command: 'build',
          platform: 'ios',
          deviceFamily: 'iphone',
          logLevel: 'trace',
          shadow: true,
          sdk: '3.5.1.GA'
        }
      },
      android: {
        options: {
          command: 'build',
          platform: 'android',
          logLevel: 'trace',
          shadow: true,
          sdk: '3.5.1.GA'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-titanium');

  grunt.registerTask('update', ['clean', 'copy']);

  grunt.registerTask('ipad', ['update', 'titanium:ipad']);
  grunt.registerTask('iphone', ['update', 'titanium:iphone']);
  grunt.registerTask('android', ['update', 'titanium:android']);
  
  grunt.registerTask('default', ['ipad']);

};