// have this one just export
export const abc = 123
export const butts =  (a, b, c) => { return 'my dignity' }

function balls(a, b, ...c) {
    console.log('a b c', a, b, c)
    console.log('this', this)
}

const boundballs = balls.bind({poop: 123}, 'k');

boundballs(1, 2);