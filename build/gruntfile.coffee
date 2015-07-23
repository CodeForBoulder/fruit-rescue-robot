module.exports = (grunt)->

  SRC_BASE =  "../src/"
  DEST_BASE = "../www/"

  grunt.initConfig

    connect:
      devserver:
        options:
          hostname: "*"
          port: 9001
          base: DEST_BASE
          debug: true

    less:
      compile:
        files:  [
          expand: true
          cwd: SRC_BASE + 'less'
          src: ['style.less']
          dest: DEST_BASE + 'css'
          ext: '.css'
        ]

    coffee:
      compile:
        files: [
          expand: true
          cwd: SRC_BASE + 'coffee/'
          src: ['*.coffee']
          dest: DEST_BASE + 'js'
          ext: '.js'
        ]
        options:
          bare: true

      compile_join:
        options:
          bare: true
          join: true
        files:
          "../www/js/all.js": [SRC_BASE + "coffee/*.coffee"]

    jade:
      index:
        files: [
          expand: true
          cwd: SRC_BASE
          src: ['index.jade']
          dest: DEST_BASE
          ext: '.html'
        ]
        options:
          pretty: true

      compile:
        files: [
          expand: true
          cwd: SRC_BASE + "jade/"
          src: ["*.jade", "**/*.jade", "!partials/*jade"]
          dest: DEST_BASE + "html/"
          ext: ".html"
        ]
        options:
          pretty: true

    notify:
      watch:
        options:
          message: "Coffee, Less & JADE files compiled"

    watch:
      less:
        files: [SRC_BASE + "less/*.less"]
        tasks: "less:compile"

      coffee:
        files: [SRC_BASE + "coffee/*.coffee"]
        tasks: "coffee:compile_join"

      jade_index:
        files: [SRC_BASE + "jade/*.jade", SRC_BASE + "*.jade"]
        tasks: "jade:index"

      jade_compile:
        files: [SRC_BASE + "jade/*.jade", SRC_BASE + "jade/**/*.jade"]
        tasks: ["jade:index"]

  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-less"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-jade"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-notify"
  grunt.loadNpmTasks "grunt-contrib-connect"

  grunt.registerTask "default", ["watch", "notify:watch"]

  grunt.registerTask "devserver", ["connect:devserver:keepalive"]
