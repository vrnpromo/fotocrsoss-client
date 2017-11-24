export default function FadeOutIn(phaser, target, callback = null){
    let tween = phaser.add.tween(target).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None);
    tween.onComplete.add(()=>{
        if(callback)
            callback();

        phaser.add.tween(target).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
    });
    tween.start();
}