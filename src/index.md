---
heroImage: profile.png
tagline: 개발, 일상, 자유로운 생각을 기록합니다.
actionText: GO →
actionLink: /dev/
disableComment: true
---

<script setup>
function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

const monthDiffs = monthDiff(new Date(2020, 7), new Date());
const years = Math.floor(monthDiffs / 12);
const months = monthDiffs % 12;
</script>

# bohyeon.dev

<br>

<div id="years-of-experience">
<span>{{ years }}</span>년
<span>{{ months }}</span>개월
</div>동안 웹 프론트엔드 개발자로 일했습니다. 프로덕트가 현실의 문제를 해결해주는걸 좋아합니다. 책과 게임을 좋아합니다.

<style scoped>
#years-of-experience {
    display: inline-block;
    margin-left: 0.5em;
}

span {
    font-size: 1.1em;
}
</style>