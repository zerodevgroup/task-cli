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
      else if(task.status === 'start') {
        taskStatus = '[.]'
      }

      console.log(`${space}${index} ${taskStatus} ${task.text}`)
    })
  }

  done(taskIndex) {
    let tasks = this.readTasks()

    tasks.forEach((task, index) => {
      if(Number(taskIndex) === Number(index)) {
        task.status = 'done'
      }
    })
    this.writeTasks(tasks)
    this.list()
  }

  undone(taskIndex) {
    let tasks = this.readTasks()

    tasks.forEach((task, index) => {
      if(Number(taskIndex) === Number(index)) {
        task.status = ''
      }
    })
    this.writeTasks(tasks)
    this.list()
  }

  start(taskIndex) {
    let tasks = this.readTasks()

    tasks.forEach((task, index) => {
      if(Number(taskIndex) === Number(index)) {
        task.status = 'start'
      }
    })
    this.writeTasks(tasks)
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
      if(!(Number(taskIndex) === Number(index))) {
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
