/**
 * Created by Fresher on 1/12/2017.
 */
var LayerPlayEnd = cc.Layer.extend({
    buttonBackToLobby:null,
    labelScore: 0,
    labelMoney: 0,
    labelRealScore: null,
    labelRealMoney: null,
    ctor:function (data) {
        this._super();
        cr.gui_register.registerGui(data, this);

        this.buttonBackToLobby.setTitleText("OK");
        this.buttonBackToLobby.setTitleFontSize(30);
        this.buttonBackToLobby.setTitleFontName("Helvetica");

        var visibleSize = cc.director.getVisibleSize();

        var plusXIcons = -240;
        var plusYLables = -12;
        var plusXLables = 50;
        var plusRealYLables = -17;
        var plusRealXLabels = 330;
        var color = cc.color(0, 0, 0);

        //Money.............
        var moneyScore = new cc.Sprite("#gold.png");
        size = moneyScore.getContentSize();
        moneyScore.setPosition(visibleSize.width / 2 + plusXIcons, visibleSize.height/2 - 15);
        this.addChild(moneyScore);

        this.labelMoney = new cc.LabelTTF("Tiền vàng thu được ", "Helvetica");
        size = this.labelMoney.getContentSize();
        this.labelMoney.setFontSize(20);
        this.labelMoney.setAnchorPoint(cc.p(0, 0));
        this.labelMoney.setColor(color);
        this.labelMoney.setPosition(moneyScore.getPosition().x + plusXLables, moneyScore.getPosition().y + plusYLables);
        this.addChild(this.labelMoney);

        this.labelRealMoney = new cc.LabelTTF("10000000 ", "Helvetica");
        size = this.labelRealMoney.getContentSize();
        this.labelRealMoney.setFontSize(30);
        this.labelRealMoney.setAnchorPoint(cc.p(0, 0));
        this.labelRealMoney.setColor(color);
        this.labelRealMoney.setPosition(moneyScore.getPosition().x + plusRealXLabels, moneyScore.getPosition().y + plusRealYLables);
        this.addChild(this.labelRealMoney);

        //Score.............
        var scoreIcon = new cc.Sprite("#G.png");
        var size = scoreIcon.getContentSize();
        scoreIcon.setPosition(visibleSize.width / 2 + plusXIcons , visibleSize.height/2 - 62);
        this.addChild(scoreIcon);

        this.labelScore = new cc.LabelTTF("Kinh nghiệm dành được ", "Helvetica");
        size = this.labelScore.getContentSize();
        this.labelScore.setFontSize(20);
        this.labelScore.setAnchorPoint(cc.p(0, 0));
        this.labelScore.setPosition(scoreIcon.getPosition().x + plusXLables, scoreIcon.getPosition().y + plusYLables);
        this.labelScore.setColor(color);
        this.addChild(this.labelScore);

        this.labelRealScore = new cc.LabelTTF("150000 ", "Helvetica");
        size = this.labelRealScore.getContentSize();
        this.labelRealScore.setFontSize(30);
        this.labelRealScore.setAnchorPoint(cc.p(0, 0));
        this.labelRealScore.setPosition(scoreIcon.getPosition().x + plusRealXLabels, scoreIcon.getPosition().y + plusRealYLables);
        this.labelRealScore.setColor(color);
        this.addChild(this.labelRealScore);
    },
    handleButtonEvents:function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED){
            if (sender == this.buttonBackToLobby){
                cc.director.popScene();
            }
        }
    },
    setScore:function (score) {
        this.labelRealScore.setString(score);
    },
    setMoney:function (money) {
        this.labelRealMoney.setString(money);
    }
});