const shell = require('shelljs')
const fs = require('fs')
const _ = require('lodash')
const dir = require('node-dir')
const path = require('path')

class Task {
  constructor() {
    this.home = process.env['HOME']
  }

  list() {
    let tasks = this.readTasks()

    let space = '  '
    tasks.forEach((task, index) => {
      if(index > 9) {
        space = ' '
      }
      if(index > 99) {
        space = ''
      }

      let taskStatus = '[ ]'
      if(task.status === 'done') {
        taskStatus = '[x]'
      }
      else if(task.status === 'progress') {
        taskStatus = '[.]'
      }

      console.log(`${space}${index} ${taskStatus} ${task.text}`)
    })
  }

  done(taskIndex) {
    let tasks = this.readTasks()
    let updatedTasks = []

    tasks.forEach((task, index) => {
      if(taskIndex === index) {
        task.status === 'done'
      }

      updatedTasks.push(task)
    })
    this.writeTasks(updatedTasks)
    this.list()
  }

  undone(taskIndex) {
    let tasks = this.readTasks()
    let updatedTasks = []

    tasks.forEach((task, index) => {
      if(taskIndex === index) {
        task.status === ''
      }

      updatedTasks.push(task)
    })
    this.writeTasks(updatedTasks)
    this.list()
  }

  progress(taskIndex) {
    let tasks = this.readTasks()
    let updatedTasks = []

    tasks.forEach((task, index) => {
      if(taskIndex === index) {
        task.status === 'progress'
      }

      updatedTasks.push(task)
    })
    this.writeTasks(updatedTasks)
    this.list()
  }
  
  add(taskText) {
    let tasks = this.readTasks()
    let task = {
      text: taskText,
      status: ''
    }
    tasks.push(task)
    this.writeTasks(tasks)
    this.list()
  }

  remove(taskIndex) {
    let tasks = this.readTasks()
    let updatedTasks = []

    tasks.forEach((task, index) => {
      if(!taskIndex === index) {
        updatedTasks.push(task)
      }
    })
    this.writeTasks(updatedTasks)
    this.list()
  }

  readTasks() {
    let tasks = JSON.parse(fs.readFileSync(`${this.home}/tasks/tasks.json`, 'utf8'))
    return(tasks)
  }

  writeTasks(updatedTasks) {
    fs.writeFileSync(`${this.home}/tasks/tasks.json`, JSON.stringify(updatedTasks, undefined, 2))
  }
} 

module.exports = Task
