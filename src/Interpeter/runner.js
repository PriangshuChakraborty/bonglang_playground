export default function runner(bongScript) {
        let consoleOutput = ``;
        const originalLog = console.log;
        console.log = function (...args) {
            consoleOutput += args.join(' ') + '\n';
            originalLog.apply(console, args);
        };



        eval(bongScript);
        let a = consoleOutput
        console.log = originalLog;
        setTimeout(() => {
            console.clear();
        }, 1000);
        return a;
}