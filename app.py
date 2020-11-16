from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def main():
   return render_template('index.html')

@app.route('/porturia')
def porturia():
   return render_template('PS.html')

if __name__ == '__main__':
   app.run()
