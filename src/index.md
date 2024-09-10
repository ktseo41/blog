---
heroImage: profile.png
tagline: 개발, 일상, 자유로운 생각을 기록합니다.
actionText: GO →
actionLink: /dev/
disableComment: true
---

<script setup>
function monthDiff(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

const monthDiffs = monthDiff(new Date(2020, 7), new Date(2024, 7));
const years = Math.floor(monthDiffs / 12);
const months = monthDiffs % 12;
</script>

# bohyeon.dev

<br>

<div id="years-of-experience">
<span class="em">{{ years }}</span>년
<span class="em">{{ months }}</span>개월
</div>동안 웹 프론트엔드 개발자로 일했습니다.

진지하고 깊이 고민하는 성격입니다. 길게 성공하는 서비스에는 좋은 개발환경이 필요하다고 믿습니다.

책과 영화, 게임을 좋아합니다.

<style scoped>
#years-of-experience {
    display: inline-block;
}

.em {
    font-size: 1.1em;
}
</style>