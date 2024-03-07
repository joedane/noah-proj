
'use strict'

class Play extends Phaser.Scene {

    constructor() {
        super("playScene")
    }

    init() { }

    preload() {
        this.load.html("list", "list.html")

        let items = {
            "list-item-1": {
                description: "This is the fist item",
                on_add: () => 1,
                on_fire: () => 2,
            },
            "list-item-2": {
                description: "This is item 2",
                on_add: () => 1,
                on_fire: () => 2,
            }
        }
        this.items = new Map(Object.entries(items))
        console.log("items")
        console.log(this.items)
        console.log(this)
    }

    create() {
        this.selected = []
        const element = this.add.dom(200, 1000).createFromCache("list")
        element.addListener('click');
        let scene = this
        element.on('click', function (event) {
            let id = event.target.id
            if (id == 'list-close') {
                console.log("CLOSE")
                scene.tweens.add({
                    targets: element,
                    y: 1000,
                    duration: 1000,
                    ease: 'Power3'
                })
            } else if (id == 'list-select') {
                console.log('SELECT')
                scene.tweens.add({
                    targets: element,
                    y: 1000,
                    duration: 1000,
                    ease: 'Power3'
                })
            } else {
                let item = scene.items.get(id)
                if (item === undefined) {
                    console.log("list item %s is unknown", id)
                } else {
                    console.log("clicked %s", id)
                    console.log("running: %s", item.description)
                    //selected.push(id)
                    event.target.className = "selected disabled"
                }
            }
        })

        this.input.keyboard.on('keydown-S', function (e) {
            scene.tweens.add({
                targets: element,
                y: 100,
                duration: 1000,
                ease: 'Power3'
            })
        })
    }


    update() { }

}


let config = {
    type: Phaser.AUTO,
    parent: 'dad-test',
    width: 640,
    height: 400,
    backgroundColor: '#eeeeee',
    dom: {
        createContainer: true,
    },
    scene: [Play]

}

let game = new Phaser.Game(config)

