/**
 * Created by Fresher on 1/13/2017.
 */
cr.skill_manager = {
    getSkillByType:function (skillType) {
        var skill;
        switch (skillType){
            case globals.SKILL_TYPE_CHARACTER_MAGNETIC:
                skill = new SkillCharacterMagnetic();
                break;
            case globals.SKILL_TYPE_CHARACTER_RESPAWN:
                skill = new SkillCharacterRespawn();
                break;
            case globals.SKILL_TYPE_PET_HP_RATE:
                skill = new SkillPetHPRate();
                break;
            case globals.SKILL_TYPE_PET_RESPAWN:
                skill = new SkillPetRespawn();
                break;
        }
        return skill;
    }
};