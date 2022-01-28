// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
function randomRGB()    {
    return `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
}

class Shape {
    constructor(x, y,velX, velY)    {
        this.x = x;
        this.y = y;
        this.velX =velX;
        this.velY = velY;
    }
}
class Ball extends Shape {    
    constructor(x, y, velX, velY, color, size)  {
        super(x, y, velX, velY);
        this.color = color;
        this.size = size;
        this.exists = true;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    update() {
        if((this.x + this.size) >= width)   {
            this.velX = -(this.velX);
        }
        if((this.x - this.size) <= 0)   {
            this.velX = -(this.velX);
        }
        if((this.y + this.size) >= height)   {
            this.velY = -(this.velY);
        }
        if((this.y - this.size) <= 0)   {
            this.velY = -(this.velY);
        }
        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect(){
        for(const ball of balls)    {
            if(!(this == ball) && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
    
                if(distance < this.size + ball.size)    {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}
class EvilCircle extends Shape {
    constructor(x,y)    {
        super( x, y, 20, 20);
        this.color = 'red';
        this.size = 10;
        this.setControls();        
    }
    setControls(){
        window.addEventListener('keydown', e => {
            console.log(e.key);
            switch(e.key){
                case 'a':
                    this.x -= this.velX;
                    break;
                case 'd':
                    this.x += this.velX;
                    break;
                case 'w':
                    this.y -= this.velY;
                    break;
                case 's':
                    this.y += this.velY;
                    break;
            }
        });
    }
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }   
    checkBounds() {
        if((this.x + this.size) >= width)   {
            
        }
        if((this.x - this.size) <= 0)   {
            
        }
        if((this.y + this.size) >= height)   {
            
        }
        if((this.y - this.size) <= 0)   {
            
        }
    }
    collisionDetect(){
        for(const ball of balls)    {
            if(ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
    
                if(distance < this.size + ball.size)    {
                    ball.exists = false;
                }
            }
        }
    } 
}

const balls = [];

while(balls.length < 20)    {
    const size = random(10, 20);
    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7,7),
        random(-7,7),
        randomRGB(),
        size
    ); 
    balls.push(ball);
}
const evilBall = new EvilCircle(50,50);

(function loop() {
    ctx.fillStyle = 'coral';
    ctx.fillRect(0,0,width, height);
    for(const ball of balls)    {
        if(ball.exists) {
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }
        evilBall.draw();
        evilBall.checkBounds();
        evilBall.collisionDetect();
    }

    requestAnimationFrame(loop);
})();

