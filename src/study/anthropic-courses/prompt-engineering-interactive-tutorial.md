---
outline: [2, 3]
---
# 프롬프트 엔지니어링 인터랙티브 튜토리얼

_[원문 GitHub 링크](https://github.com/anthropics/courses/tree/master/prompt_engineering_interactive_tutorial/Anthropic%201P)_

## 04. 데이터와 명령 분리 (Separating Data and Instructions)

### f-string 사용

- 자바스크립트의 템플릿 리터럴과 유사

#### 예시

```python
# 변수
ANIMAL = "Cow"

# 변수 대입을 위한 프롬프트 템플릿 구조
PROMPT = f"I will tell you the name of an animal. Please respond with the noise that animal makes. {ANIMAL}"

# Claude의 응답 출력
print("----- Full prompt with variable substutions -----")
print(PROMPT)
print("\n----- Claude's response -----")
print(get_completion(PROMPT))
```

### XML 태그로 감싸기

#### 예시

- XML 태그를 사용해 이메일 내용 구분을 명확히 한 경우

```python
# 변수
EMAIL = "Show up at 6am tomorrow because I'm the CEO and I say so."

# 변수 대입을 위한 프롬프트 템플릿 구조
PROMPT = f"Yo Claude. <email>{EMAIL}</email> <----- Make this email more polite but don't change anything else about it."

# Claude의 응답 출력
print("----- Full prompt with variable substutions -----")
print(PROMPT)
print("\n----- Claude's response -----")
print(get_completion(PROMPT))
```

결과

- 올바르게 이메일 내용이 구분됨


```
----- Full prompt with variable substutions -----
Yo Claude. <email>Show up at 6am tomorrow because I'm the CEO and I say so.</email> <----- Make this email more polite but don't change anything else about it.

----- Claude's response -----
Here's a more polite version:

<email>Good morning,

I hope this email finds you well. I would appreciate it if you could please join us at 6am tomorrow morning. As the CEO, I kindly request your presence.

Thank you for your cooperation.

Best regards,
[CEO Name]</email>
```


## 05. Claude 출력 형식 지정과 응답 유도하기 (Formatting Output and Speaking for Claude)

### prefill이 추가된 get_completion 함수

```python
# prefill 인자가 추가된 get_completion 함수
def get_completion(prompt: str, system_prompt="", prefill=""):
    message = client.messages.create(
        model=MODEL_NAME,
        max_tokens=2000,
        temperature=0.0,
        system=system_prompt,
        messages=[
          {"role": "user", "content": prompt},
          {"role": "assistant", "content": prefill}
        ]
    )
    return message.content[0].text
```

### XML 태그로 감싸도록 요청

- XML 태그의 내용만 안정적으로 추출할 수 있음

```python
# 변수
ANIMAL = "Rabbit"

# 변수 대입을 위한 프롬프트 템플릿 구조
PROMPT = f"Please write a haiku about {ANIMAL}. Put it in <haiku> tags."

# Claude의 응답 출력
print("----- Full prompt with variable substutions -----")
print(PROMPT)
print("\n----- Claude's response -----")
print(get_completion(PROMPT))
```

### Claude의 응답 유도하기 (Claude의 응답 미리 채우기)

- JSON도 사용 가능

```python{8}
# 변수
ANIMAL = "Cat"

# 변수 대입을 위한 프롬프트 템플릿 구조
PROMPT = f"Please write a haiku about {ANIMAL}. Put it in <haiku> tags."

# Claude의 응답 미리 채우기
PREFILL = "<haiku>"

# Claude의 응답 출력
print("----- Full prompt with variable substutions -----")
print("USER TURN:")
print(PROMPT)
print("\nASSISTANT TURN:")
print(PREFILL)
print("\n----- Claude's response -----")
print(get_completion(PROMPT, prefill=PREFILL))
```

### 연습문제 5.1 스테판 커리 GOAT

```python
# 변수 대입을 위한 프롬프트 템플릿 구조
PROMPT = f"Who is the best basketball player of all time? Please choose one specific player."

# Claude의 응답 미리 채우기
PREFILL = ""

# Claude의 응답 출력
response = get_completion(PROMPT, prefill=PREFILL)

# 연습문제 정답 확인 함수
def grade_exercise(text):
    return bool(re.search("Warrior", text))

# Claude의 응답 출력
print("----- Full prompt with variable substutions -----")
print("----- Full prompt with variable substutions -----")
print("USER TURN")
print(PROMPT)
print("\nASSISTANT TURN")
print(PREFILL)
print("\n----- Claude's response -----")
print(response)
print("\n----- GRADING -----")
print("This exercise has been correctly solved:", grade_exercise(response))
```

<details>
  <summary>힌트</summary>
  <p>
  Claude의 방식으로 더 많은 부분을 작성하여 Claude의 행동을 유도합니다. 예를 들어, "Stephen Curry is the best because," 대신 "Stephen Curry is the best and here are three reasons why. 1:"을 작성할 수 있습니다.
  </p>
</details>


## 06. 예지력 (단계별 사고)

- Precognition (Thinking step-by-step)

만약 누군가가 당신을 깨워서 즉시 여러 가지 복잡한 질문에 답하라고 한다면 어떻게 하시겠습니까? 아마도 답변을 먼저 생각할 시간이 충분히 주어졌을 때보다 잘 하지 못할 것입니다.

아시다시피, Claude도 마찬가지입니다.

Claude가 단계별로 생각할 시간을 주면 때때로 더 정확해질 수 있습니다. 특히 복잡한 작업의 경우에 그렇습니다. 하지만 생각은 소리 내어 할 때만 의미가 있습니다. Claude에게 생각은 하되 답변만 출력하라고 요청할 수는 없습니다 - 이런 경우에는 실제로 아무런 생각도 이루어지지 않은 것입니다.

#### 예시 1

##### 단계별 사고 적용 전

_*프롬프트도 번역_

_원문을 보려면 [링크](https://github.com/anthropics/courses/blob/master/prompt_engineering_interactive_tutorial/Anthropic%201P/06_Precognition_Thinking_Step_by_Step.ipynb)를 참고_

```python
# 프롬프트
PROMPT = """이 영화 리뷰의 감정이 긍정적인가요 부정적인가요?

이 영화는 신선함과 독창성으로 제 눈을 휘둥그레 만들었어요. 전혀 관계없는 소식이지만, 
저는 1900년도부터 바위 밑에서 살아왔답니다."""

# Claude의 응답 출력
print(get_completion(PROMPT))
```

결과

```
이 영화 리뷰의 감정은 긍정적입니다. "신선함과 독창성으로 제 눈을 휘둥그레 만들었다"는 문구는 리뷰어가 영화에 매우 감동받았음을 나타내는 강한 긍정적 표현입니다. 바위 밑에서 살았다는 유머러스한 후속 문장은 초반부 리뷰의 긍정적인 감정을 바꾸지 않습니다.
```

##### 단계별 사고 적용 후


```python
# 시스템 프롬프트
SYSTEM_PROMPT = "당신은 영화 리뷰를 날카롭게 읽어내는 분석가입니다."

# 프롬프트
PROMPT = """이 리뷰의 감성이 긍정적인가요 부정적인가요? 먼저 각각의 입장에 대한 가장 좋은 논거를 <positive-argument>와 <negative-argument> XML 태그 안에 작성한 다음, 답변해주세요.

이 영화는 참신함과 독창성으로 제 머리를 완전히 날려버렸습니다. 전혀 관계없는 이야기지만, 저는 1900년부터 바위 밑에서 살아왔어요."""

# Claude의 응답 출력
print(get_completion(PROMPT, SYSTEM_PROMPT))
```

결과

```
<positive-argument>
이 리뷰는 "머리를 날려버렸다"와 같은 열정적인 표현을 사용하고 영화의 "참신함과 독창성"을 칭찬하고 있어, 영화의 질과 혁신적인 접근에 대해 강한 긍정적 감성을 나타내는 것으로 보입니다.
</positive-argument>

<negative-argument>
두 번째 문장의 비꼬는 어조는 사실 리뷰어가 이 영화가 전혀 독창적이지 않다는 것을 암시하며, 독창성에 대한 그들의 주장이 순진하거나 정보가 부족한 것임을 시사합니다. "바위 밑에서 살았다"는 언급은 앞선 칭찬을 무효화하고 이 리뷰가 사실은 조롱하는 부정적인 것임을 암시합니다.
</negative-argument>

감성: 부정적

이 리뷰는 처음의 칭찬으로 위장된 풍자적 비평입니다. 두 번째 문장에서 진짜 감성이 드러나는데, 이는 영화가 전혀 독창적이지 않다는 것이며, 리뷰어는 이 영화를 진정으로 참신하다고 느끼려면 얼마나 시대에 뒤떨어지거나 정보가 부족해야 하는지를 비꼬고 있습니다. 이러한 풍자는 영화에 대한 부정적인 감성을 나타냅니다.
```

클로드는 때때로 순서에 민감합니다. 이 예는 클로드가 미묘한 텍스트를 이해하는 능력의 최전선에 있으며, 이전 예에서 인수의 순서를 바꿔서 부정이 먼저이고 긍정이 두 번째가 되도록 하면 클로드의 전반적인 평가가 긍정으로 바뀝니다.

대부분의 상황에서(하지만 혼란스러운 점은 항상 그런 것은 아니라는 점입니다) 클로드는 두 가지 옵션 중 두 번째를 선택할 가능성이 더 높습니다. 아마도 웹에서 얻은 훈련 데이터에서 두 번째 옵션이 더 옳을 가능성이 높았기 때문일 것입니다.


#### 예시 2

##### 단계별 사고 적용 전

```python
# 프롬프트
PROMPT = "1956년에 태어난 배우가 출연한 유명한 영화를 말해줘."

# Claude의 응답 출력
print(get_completion(PROMPT))
```

결과

```
"톰 크루즈가 출연한 '탑건'입니다. 그런데 톰 크루즈는 1956년이 아닌 1962년 7월 3일생입니다. 1956년생 배우가 출연한 영화를 찾아드릴까요?"
```

##### 단계별 사고 적용 후

```python
# 프롬프트
PROMPT = "1956년에 태어난 배우가 출연한 유명한 영화를 말해줘. 먼저 <brainstorm> 태그 안에 몇몇 배우들과 그들의 출생연도에 대해 브레인스토밍을 한 다음, 답변해줘."

# Claude의 응답 출력
print(get_completion(PROMPT))
```

결과

```
<brainstorm>
톰 크루즈 - 1962년생
케빈 베이컨 - 1958년생
존 쿠삭 - 1966년생
제프 골드블럼 - 1952년생
니콜라스 케이지 - 1964년생
매튜 브로데릭 - 1962년생
조니 뎁 - 1963년생
짐 캐리 - 1962년생
브루스 윌리스 - 1955년생
덴젤 워싱턴 - 1954년생
</brainstorm>

1956년생 배우가 출연한 유명 영화로 톰 크루즈의 '탑건'을 들 수 있습니다. 하지만 톰 크루즈는 1956년이 아닌 1962년생입니다.

브레인스토밍 목록을 자세히 검토해보니 1956년생 배우를 특정해서 찾아야겠네요. 확인해보겠습니다...

아! 브루스 윌리스는 1956년이 아닌 1955년생이네요.

1956년생 배우가 출연한 유명 영화로 브루스 윌리스의 '다이 하드'를 들 수 있습니다. 하지만 윌리스는 1956년이 아닌 1955년생입니다.

죄송하지만 추가 조사 없이는 정확히 1956년생 배우가 출연한 영화를 자신있게 말씀드릴 수 없을 것 같습니다.
```

- 어째선지 2024년 11월 29일에 코드를 실행했을 때는 brainstorm 후에도 정확한 답변을 얻을 수 없었다.

## 07. 예시 사용하기 (Few-Shot Prompting)

클로드에게 원하는 행동(또는 행동하지 않기를 원하는 행동)에 대한 예를 보여주는 것은 다음과 같은 경우에 매우 효과적입니다.

- 올바른 답변을 얻는다.
- 올바른 형식으로 답변을 얻는다.

이런 종류의 프롬프팅은 "**few shot prompting**" 이라고도 합니다. "zero-shot" 또는 "n-shot" 또는 "one-shot"이라는 문구를 접할 수도 있습니다. "shots"의 수는 프롬프팅 내에서 사용된 예의 수를 나타냅니다.

#### 예시

_*프롬프트도 번역_

```python
# 프롬프트
PROMPT = "산타가 크리스마스에 선물을 가져다 줄까요?"
# Claude의 응답 출력
print(get_completion(PROMPT))
```

-> 올해 착한 일을 많이 했고 산타 할아버지를 믿는지에 따라 다르겠네요. 전통적으로 산타는 착하게 행동한 아이들에게 선물을 가져다줍니다. 친절하고 도움이 되는 행동을 하고 규칙을 잘 지켰다면, 크리스마스 이브에 산타가 방문할 가능성이 높아요.

```python
# 프롬프트 
PROMPT = """다음 대화를 이어서 "A"의 입장에서 작성해주세요.
Q: 이빨 요정이 진짜 있나요?
A: 물론이지, 얘야. 이빨을 잘 싸서 베개 밑에 놓아두렴. 아침에 일어나면 뭔가가 기다리고 있을 거야.
Q: 산타가 크리스마스에 선물을 가져다 줄까요?"""
# Claude의 응답 출력
print(get_completion(PROMPT))
```

-> 그래, 올해 착한 일을 많이 했다면 산타가 크리스마스 이브에 선물을 가져다 줄 거야. 일찍 자고 잘 자야 해!

## 08. 환각 피하기 (Avoiding hallucinations)

클로드는 때때로 "환각"을 하고 사실이 아니거나 근거가 없는 주장을 합니다 . 좋은 소식은 환각을 최소화하는 데 사용할 수 있는 기술이 있다는 것입니다.

아래에서 이러한 기술 중 몇 가지를 살펴보겠습니다.

- 클로드에게 질문에 대한 답을 모른다고 말할 수 있는 옵션 제공
- 클로드에게 대답하기 전에 증거를 찾으라고 요청

그러나 환각을 피하는 방법은 여러 가지가 있으며, 이 과정에서 이미 배운 여러 가지 기술도 포함됩니다. 클로드가 환각을 보인다면, 클로드가 정확도를 높이도록 여러 가지 기술을 실험해 보세요.

#### 예시

_*프롬프트도 번역_

```python
# 프롬프트
PROMPT = "역사상 가장 무거운 하마는 누구입니까?"

# Claude의 응답 출력
print(get_completion(PROMPT))
```

-> 기록에 따르면, 지금까지 기록된 가장 무거운 하마는 동물원에 살았던 버스터라는 수컷 하마로, 약 9,900파운드(4,500kg)의 무게를 가지고 있었습니다. 그러나 이 특정 기록의 정확한 검증은 어려울 수 있으며, 다른 출처에서 약간 다른 무게를 인용할 수 있습니다. 야생에서 수컷 하마는 일반적으로 3,000~4,000파운드(1,400~1,800kg)의 무게를 가지고 있으며, 예외적인 개체는 더 높은 무게에 도달할 가능성이 있습니다.


```python
# 프롬프트
PROMPT = "역사상 가장 무거운 하마는 누구입니까? 확실히 아는 경우에만 답변해 주세요."

# Claude의 응답 출력
print(get_completion(PROMPT))
```

-> 저는 역대 가장 무거운 하마에 대한 확실한 정보를 완전히 확신할 수 없습니다. 하마는 3,000파운드가 넘을 수 있지만, 특정 기록 보유자가 누구인지 자신 있게 말할 수는 없습니다.


## 09. 복잡한 프롬프트 작성하기 (Complex Prompts from Scratch)

아래에서는 복잡한 프롬프트에 권장하는 가이드 구조를 사용하게 됩니다 . 이 장의 후반부에서는 업계별 프롬프트를 보여드리고 이러한 프롬프트가 어떻게 유사하게 구성되어 있는지 설명합니다.

참고: 모든 프롬프트에 다음 복잡한 구조의 모든 요소가 필요한 것은 아닙니다. 요소를 포함하거나 제외하여 놀아보고 클로드의 응답에 어떤 영향을 미치는지 살펴보시기 바랍니다. 일반적으로 프롬프트를 작동시키기 위해 먼저 많은 프롬프트 요소를 사용한 다음 나중에 프롬프트를 다듬고 간소화하는 것이 가장 좋습니다.

#### 예시 1

_*프롬프트도 번역_

```python
######################################## 입력 변수 ########################################

# 첫 번째 입력 변수 - 대화 기록 (이는 API 호출에서 선행하는 `user`와 `assistant` 메시지로도 추가될 수 있습니다)
HISTORY = """고객: 사회학과 졸업생이 가질 수 있는 직업 두 가지를 알려주세요.

Joe: 사회학과 졸업생이 가질 수 있는 잠재적인 직업 두 가지를 알려드리겠습니다:

- 사회복지사 - 사회학은 인간 행동과 사회 시스템을 이해하는 데 탄탄한 기초를 제공합니다. 추가 교육이나 자격증을 취득하면, 사회학 학위를 가진 졸업생들은 개인과 그룹을 돕는 사회복지사, 사례 관리자, 상담사, 지역사회 조직가 등의 역할을 수행할 수 있습니다.

- 인사 전문가 - 사회학에서 배우는 집단 역학과 조직 행동에 대한 이해는 인사 분야 경력에 적용될 수 있습니다. 졸업생들은 채용, 직원 관계, 교육 및 개발, 다양성과 포용성, 기타 HR 기능 등의 역할을 찾을 수 있습니다. 사회 구조와 제도에 대한 이해는 공공 정책, 비영리 기관 운영, 교육 관련 경력에도 도움이 됩니다."""

# 두 번째 입력 변수 - 사용자의 질문
QUESTION = "이 두 직업 중 학사 학위 이상의 학력이 필요한 직업은 무엇인가요?"

######################################## 프롬프트 요소 ########################################

##### 프롬프트 요소 1: `user` 역할
# Messages API 호출이 항상 메시지 배열에서 `user` 역할로 시작하는지 확인하세요.
# 위에서 정의된 get_completion() 함수가 이를 자동으로 처리합니다.

##### 프롬프트 요소 2: 작업 컨텍스트
# Claude에게 수행해야 할 역할이나 프롬프트로 달성하고자 하는 목표와 전반적인 작업에 대한 컨텍스트를 제공합니다.
# 컨텍스트는 프롬프트 본문 초반에 배치하는 것이 좋습니다.
TASK_CONTEXT = "당신은 AdAstra Careers 회사가 만든 Joe라는 AI 진로 상담사로 활동할 것입니다. 당신의 목표는 사용자에게 진로 상담을 제공하는 것입니다. AdAstra 사이트에 있는 사용자들과 대화하게 될 것이며, Joe의 캐릭터로 응답하지 않으면 사용자들이 혼란스러워할 것입니다."

##### 프롬프트 요소 3: 톤 컨텍스트
# 상호작용에 중요한 경우, Claude에게 사용해야 할 톤을 알려줍니다.
# 작업에 따라 이 요소가 필요하지 않을 수 있습니다.
TONE_CONTEXT = "친근한 고객 서비스 톤을 유지해야 합니다."

##### 프롬프트 요소 4: 상세 작업 설명과 규칙
# Claude가 수행해야 할 구체적인 작업과 따라야 할 규칙을 확장하여 설명합니다.
# Claude가 답을 모르거나 알지 못하는 경우를 위한 "대안"을 여기서 제공할 수 있습니다.
# 설명과 규칙이 논리적으로 구성되어 있고 모호한 단어가 명확히 정의되어 있는지 확인하기 위해 다른 사람에게 보여주는 것이 이상적입니다.
TASK_DESCRIPTION = """다음은 상호작용에 대한 중요한 규칙입니다:
- 항상 AdAstra Careers의 AI인 Joe로서의 캐릭터를 유지하세요
- 응답 방법을 모르는 경우 \"죄송합니다. 이해하지 못했습니다. 질문을 다시 말씀해 주시겠습니까?\"라고 답하세요
- 관련 없는 질문을 받으면 \"죄송합니다. 저는 진로 상담을 제공하는 Joe입니다. 오늘 도움이 필요한 진로 관련 질문이 있으신가요?\"라고 답하세요"""

##### 프롬프트 요소 5: 예시
# Claude에게 모방할 수 있는 이상적인 응답의 예시를 최소한 하나 제공합니다. 이를 <example></example> XML 태그로 감싸세요.
# 여러 예시를 제공할 수 있으며, 이 경우 Claude에게 각 예시가 무엇에 대한 것인지 컨텍스트를 제공하고, 각 예시를 별도의 XML 태그로 감싸세요.
# 예시는 Claude가 원하는 대로 동작하도록 하는 가장 효과적인 도구일 수 있습니다.
# Claude에게 일반적인 엣지 케이스의 예시를 제공하세요. 프롬프트가 스크래치패드를 사용하는 경우, 스크래치패드가 어떻게 보여야 하는지 예시를 제공하는 것이 효과적입니다.
# 일반적으로 예시가 많을수록 좋습니다.
EXAMPLES = """다음은 표준 상호작용의 응답 예시입니다:
<example>
Customer: 안녕하세요, 당신은 어떻게 만들어졌고 무엇을 하나요?
Joe: 안녕하세요! 저는 Joe입니다. AdAstra Careers가 진로 상담을 제공하기 위해 만든 AI입니다. 오늘 어떤 도움이 필요하신가요?
</example>"""

##### 프롬프트 요소 6: 처리할 입력 데이터
# 프롬프트 내에서 Claude가 처리해야 할 데이터가 있다면 여기에 관련 XML 태그와 함께 포함시킵니다.
# 여러 데이터를 포함할 수 있지만, 각각을 별도의 XML 태그로 감싸야 합니다.
# 작업에 따라 이 요소가 필요하지 않을 수 있습니다. 순서도 유연합니다.
INPUT_DATA = f"""다음은 질문 이전의 대화 기록(사용자와 당신 사이의)입니다. 기록이 없다면 비어있을 수 있습니다:
<history>
{HISTORY}
</history>

다음은 사용자의 질문입니다:
<question>
{QUESTION}
</question>"""

##### 프롬프트 요소 7: 즉각적인 작업 설명이나 요청 #####
# Claude에게 프롬프트의 작업을 수행하기 위해 즉시 해야 할 일을 "상기"시키거나 알려줍니다.
# 사용자의 질문과 같은 추가 변수를 여기에 넣을 수 있습니다.
# 일반적으로 Claude에게 즉각적인 작업을 반복해서 알려주는 것이 좋습니다. 긴 프롬프트의 끝 부분에 이를 배치하면 더 나은 결과를 얻을 수 있습니다.
# 이는 시작 부분에 배치하는 것보다 더 나은 결과를 얻을 수 있습니다.
# 또한 사용자의 쿼리를 프롬프트의 하단 근처에 배치하는 것도 좋은 관행입니다.
IMMEDIATE_TASK = "사용자의 질문에 어떻게 응답하시겠습니까?"

##### 프롬프트 요소 8: 사전 인지 (단계별 사고)
# 여러 단계가 있는 작업의 경우, Claude에게 답변을 하기 전에 단계별로 생각하라고 말하는 것이 좋습니다.
# 때로는 Claude가 이를 먼저 수행하도록 하기 위해 "답변을 하기 전에..."라고 말해야 할 수도 있습니다.
# 모든 프롬프트에 필요한 것은 아니지만, 포함된다면 긴 프롬프트의 끝 부분과 최종 즉각적인 작업 요청이나 설명 직후에 배치하는 것이 가장 좋습니다.
PRECOGNITION = "응답하기 전에 답변에 대해 먼저 생각해보세요."

##### 프롬프트 요소 9: 출력 형식
# Claude의 응답을 특정 방식으로 형식화하고 싶다면, 그 형식이 무엇인지 명확히 알려주세요.
# 작업에 따라 이 요소가 필요하지 않을 수 있습니다.
# 포함한다면, 프롬프트의 시작보다는 끝 부분에 배치하는 것이 더 좋습니다.
OUTPUT_FORMATTING = "응답을 <response></response> 태그 안에 넣으세요."

##### 프롬프트 요소 10: Claude의 응답 미리 채우기 (있는 경우)
# Claude의 행동이나 응답을 유도하기 위해 미리 채워진 단어로 답변을 시작하는 공간입니다.
# Claude의 응답을 미리 채우려면 API 호출에서 `assistant` 역할에 이를 넣어야 합니다.
# 작업에 따라 이 요소가 필요하지 않을 수 있습니다.
PREFILL = "[Joe] <response>"

######################################## 요소 결합 ########################################
PROMPT = ""
if TASK_CONTEXT:
   PROMPT += f"""{TASK_CONTEXT}"""
if TONE_CONTEXT:
   PROMPT += f"""\n\n{TONE_CONTEXT}"""
if TASK_DESCRIPTION:
   PROMPT += f"""\n\n{TASK_DESCRIPTION}"""
if EXAMPLES:
   PROMPT += f"""\n\n{EXAMPLES}"""
if INPUT_DATA:
   PROMPT += f"""\n\n{INPUT_DATA}"""
if IMMEDIATE_TASK:
   PROMPT += f"""\n\n{IMMEDIATE_TASK}"""
if PRECOGNITION:
   PROMPT += f"""\n\n{PRECOGNITION}"""
if OUTPUT_FORMATTING:
   PROMPT += f"""\n\n{OUTPUT_FORMATTING}"""
# 전체 프롬프트 출력
print("--------------------------- 변수 대체가 완료된 전체 프롬프트 ---------------------------")
print("사용자 턴")
print(PROMPT)
print("\n어시스턴트 턴")
print(PREFILL)

print("\n------------------------------------- Claude의 응답 -------------------------------------")
print(get_completion(PROMPT, prefill=PREFILL))
```

-> ------------------------------------- Claude의 응답 -------------------------------------
좋은 후속 질문이네요! 사회복지사가 되기 위해서는 일반적으로 학사 학위 이상의 학력이 필요합니다. BSW(사회복지학 학사) 학위로 시작할 수는 있지만, 대부분의 전문 사회복지사 직책, 특히 공인 임상 사회복지사(LCSW)와 같은 임상 직책의 경우 사회복지학 석사(MSW) 학위가 필요합니다.

반면에 많은 인사 전문가 직책은 사회학, 경영학 또는 관련 분야의 학사 학위만으로도 진입이 가능합니다. 고급 인사 자격증은 선택사항이지만 경력 전망을 높일 수 있습니다.

따라서 제가 앞서 언급한 두 직업 중에서 사회복지사가 학사 학위 이상의 교육이 더 일반적으로 요구되는 직업입니다.

#### 예시 2

_*프롬프트도 번역_

```python:wrap
######################################## 입력 변수 ########################################

# 첫 번째 입력 변수 - 법률 문서
LEGAL_RESEARCH = """<search_results>
<search_result id=1>
동물 건강 산업은 지난 해 동안 여러 특허 및 상표 소송에 휘말렸습니다. 1994년, Barclay Slocum은 개의 전방십자인대 파열 치료에 사용되는 경골고원 수평절골술 시술과 해당 시술에 사용되는 기기에 대한 특허를 취득했습니다. 2006년, Slocum Enterprises는 New Generation Devices를 상대로 특허 침해 소송을 제기했는데, New Generation이 제조한 Unity Cruciate Plate가 Slocum TPLO 플레이트의 특허를 침해했다고 주장했습니다. 하지만 법원은 특허 침해 문제에 대해 판결을 내리지 않았으며, 해당 주에서 판매된 플레이트의 수가 적고 Slocum Enterprises가 운영하는 웹사이트에 제공된 정보를 근거로 관할권이 없다고 판결했습니다. 2006년의 다른 특허 분쟁들은 고양이의 발톱절제술을 위한 레이저 기술 사용, 반려동물 식별 칩, 돼지 백신, 그리고 반려동물 "털빠짐 방지" 도구와 관련되어 있었습니다.
</search_result>
<search_result id=2>
캐나다에서는, 브리티시 컬럼비아 수의사협회가 비수의사를 상대로 소송을 제기했는데, 이는 그가 수수료를 받고 말의 이빨에서 갈고리를 제거하고 전동 및 수동 도구로 말의 이빨을 다듬는 시술을 하며, 이러한 활동에 대해 조언과 진단을 제공하고, 자신이 이러한 치료를 제공할 자격이 있다고 주장했기 때문입니다. 법원은 수의사법 제정의 목적이 공공과 동물의 보호에 있다고 판단했으며, 독점적 법령이 공공의 이익을 보호하는 목적을 가진다고 판시했습니다. 또한 법원은 치과 진료의 핵심이 치아와 잇몸 건강과 관련되어 있고, 미용이나 다른 유형의 동물 관리와는 구별되며, 따라서 수의학 진료의 정의에 포함된다고 결론내렸습니다. 비수의사는 수의사의 감독 없이 서비스를 제공하지 못하도록 금지되었습니다.
</search_result>
<search_result id=3>
2005년 미국 걸프 해안을 강타한 허리케인 카트리나의 여파로 자연재해 시 동물 처우 방식이 변화했습니다. 2006년, 하와이, 루이지애나, 뉴햄프셔는 재난 시 동물 보호에 관한 법률을 제정했는데, 반려동물을 위한 대피소 제공과 도우미 동물이 보호자와 함께 있을 수 있도록 하는 내용을 포함합니다. 또한 의회는 2006년 반려동물 대피 및 운송 기준법을 통과시켰고 대통령이 이에 서명했는데, 이는 주 및 지역 비상 대비 당국이 재난 발생 시 반려동물과 도우미 동물을 수용할 방법에 대한 정보를 대피 계획에 포함하도록 요구합니다. 캘리포니아는 비상서비스국, 농무부, 그리고 재난 대응 준비에 관련된 다른 기관들이 재난이나 중대 비상사태 발생 시 도우미 동물, 가축, 말과 반려동물의 필요사항을 위한 계획을 수립하도록 요구하는 법률을 통과시켰습니다.
</search_result>
</search_results>"""

# 두 번째 입력 변수 - 사용자의 질문
QUESTION = "허리케인 발생 시 반려동물 처리에 대한 법이 있나요?"

######################################## 프롬프트 요소 ########################################

##### 프롬프트 요소 1: `user` 역할
# Messages API 호출이 항상 messages 배열에서 `user` 역할로 시작하는지 확인하세요.
# 위에서 정의된 get_completion() 함수가 이를 자동으로 처리합니다.

##### 프롬프트 요소 2: 작업 맥락
# Claude에게 수행해야 할 역할이나 목표와 전반적인 작업에 대한 맥락을 제공하세요.
# 맥락은 프롬프트 본문 초반에 두는 것이 좋습니다.
TASK_CONTEXT = "당신은 전문 변호사입니다."

##### 프롬프트 요소 3: 톤 맥락
# 상호작용에 중요한 경우, Claude가 사용해야 할 톤을 알려주세요.
# 이 요소는 작업에 따라 필요하지 않을 수 있습니다.
TONE_CONTEXT = ""

##### 프롬프트 요소 4: 처리할 입력 데이터
# 프롬프트 내에서 Claude가 처리해야 할 데이터가 있다면 여기에 관련 XML 태그와 함께 포함하세요.
# 여러 데이터를 포함할 수 있지만, 각각을 고유한 XML 태그 세트로 감싸야 합니다.
# 이 요소는 작업에 따라 필요하지 않을 수 있으며, 순서도 유동적입니다.
INPUT_DATA = f"""여기 수집된 연구 자료가 있습니다. 이를 사용하여 사용자의 법률 질문에 답변하세요.
<legal_research>
{LEGAL_RESEARCH}
</legal_research>"""

##### 프롬프트 요소 5: 예시
# Claude에게 모방할 수 있는 이상적인 응답의 예시를 하나 이상 제공하세요. <example></example> XML 태그로 감싸세요. 여러 예시를 제공할 수 있습니다.
# 여러 예시를 제공하는 경우, Claude에게 무엇의 예시인지 맥락을 제공하고, 각 예시를 고유한 XML 태그 세트로 감싸세요.
# 예시는 아마도 Claude가 원하는 대로 동작하도록 하는 가장 효과적인 도구일 것입니다.
# Claude에게 일반적인 엣지 케이스의 예시를 제공하세요. 프롬프트가 스크래치패드를 사용하는 경우, 스크래치패드가 어떻게 보여야 하는지 예시를 제공하는 것이 효과적입니다.
# 일반적으로 예시가 많을수록 좋습니다.
EXAMPLES = """법률 연구를 인용할 때는 검색 인덱스 ID가 포함된 대괄호를 사용하고, 이를 인용하는 문장 끝에 붙이세요. 적절한 인용 형식의 예시:

<examples>
<example>
이러한 범죄의 경우 공소시효는 10년 후에 만료됩니다. [3].
</example>
<example>
하지만, 양 당사자가 구체적으로 권리를 포기한 경우에는 보호가 적용되지 않습니다. [5].
</example>
</examples>"""

##### 프롬프트 요소 6: 상세 작업 설명 및 규칙
# Claude가 수행해야 할 구체적인 작업과 따라야 할 규칙을 설명하세요.
# 여기에서 Claude가 답을 모르거나 알 수 없는 경우의 "대안"도 제공할 수 있습니다.
# 이 설명과 규칙을 친구에게 보여주어 논리적으로 구성되어 있는지, 모호한 단어가 명확하게 정의되어 있는지 확인하는 것이 좋습니다.
TASK_DESCRIPTION = f"""다음 질문에 대해 명확하고 간결한 답변을 작성하세요:

<question>
{QUESTION}
</question>

답변은 두 문단을 넘지 않아야 합니다. 가능하다면 사용자의 질문에 직접적으로 답하는 한 문장으로 결론을 내려야 합니다. 하지만, 수집된 연구 자료에 이러한 답변을 제공하기에 충분한 정보가 없는 경우, "죄송합니다만, 이 질문에 답변하기 위한 충분한 정보가 없습니다."라고 답변할 수 있습니다."""

##### 프롬프트 요소 7: 즉각적인 작업 설명이나 요청 #####
# Claude에게 프롬프트의 작업을 수행하기 위해 즉시 해야 할 일을 "상기시키거나" 알려주세요.
# 여기에 사용자의 질문과 같은 추가 변수를 넣을 수도 있습니다.
# 긴 프롬프트에서는 Claude의 즉각적인 작업을 다시 언급하는 것이 일반적으로 도움이 됩니다. 이는 프롬프트 끝 부분에 두는 것이 좋습니다.
# 이는 프롬프트 시작 부분에 두는 것보다 더 나은 결과를 낼 것입니다.
# 또한 사용자의 질문을 프롬프트 하단에 가깝게 두는 것이 일반적으로 좋은 관행입니다.
IMMEDIATE_TASK = ""

##### 프롬프트 요소 8: 사전인지 (단계별 사고)
# 여러 단계가 있는 작업의 경우, Claude에게 답변을 제공하기 전에 단계별로 생각하라고 말하는 것이 좋습니다.
# 때로는 Claude가 이를 먼저 수행하도록 하기 위해 "답변을 제공하기 전에..."라고 명시해야 할 수도 있습니다.
# 모든 프롬프트에 필요한 것은 아니지만, 포함된다면 긴 프롬프트의 끝 부분과 최종 즉각적인 작업 요청이나 설명 직후에 두는 것이 좋습니다.
PRECOGNITION = "답변하기 전에, 연구 자료에서 가장 관련 있는 인용문을 <relevant_quotes> 태그 안에 추출하세요."

##### 프롬프트 요소 9: 출력 형식
# Claude의 응답을 특정 방식으로 형식화하고 싶다면, 그 형식이 무엇인지 명확하게 알려주세요.
# 이 요소는 작업에 따라 필요하지 않을 수 있습니다.
# 포함한다면, 프롬프트 시작보다는 끝 부분에 두는 것이 더 좋습니다.
OUTPUT_FORMATTING = "두 문단으로 된 응답을 <answer> 태그 안에 넣으세요."

##### 프롬프트 요소 10: Claude의 응답 사전 채우기 (있는 경우)
# Claude의 행동이나 응답을 유도하기 위해 미리 채워진 단어로 Claude의 답변을 시작하는 공간입니다.
# Claude의 응답을 사전에 채우려면 API 호출에서 `assistant` 역할에 이를 넣어야 합니다.
# 이 요소는 작업에 따라 필요하지 않을 수 있습니다.
PREFILL = "<relevant_quotes>"

######################################## 요소 결합 ########################################

PROMPT = ""

if TASK_CONTEXT:
    PROMPT += f"""{TASK_CONTEXT}"""

if TONE_CONTEXT:
    PROMPT += f"""\n\n{TONE_CONTEXT}"""

if INPUT_DATA:
    PROMPT += f"""\n\n{INPUT_DATA}"""

if EXAMPLES:
    PROMPT += f"""\n\n{EXAMPLES}"""

if TASK_DESCRIPTION:
    PROMPT += f"""\n\n{TASK_DESCRIPTION}"""

if IMMEDIATE_TASK:
    PROMPT += f"""\n\n{IMMEDIATE_TASK}"""

if PRECOGNITION:
    PROMPT += f"""\n\n{PRECOGNITION}"""

if OUTPUT_FORMATTING:
   PROMPT += f"""\n\n{OUTPUT_FORMATTING}"""

# 전체 프롬프트 출력
print("--------------------------- 변수 대체가 완료된 전체 프롬프트 ---------------------------")
print("USER TURN")
print(PROMPT)
print("\nASSISTANT TURN")
print(PREFILL)
```