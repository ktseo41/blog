# [Brilliant](https://brilliant.org/home/)

<StreakOnDay :streak="2" :complete="21"></StreakOnDay>

## [Computer Science Foundations](https://brilliant.org/paths/computer-science-foundations/)

컴퓨터 과학의 핵심 아이디어에서 시작하여 알고리즘과 신경망으로 진행합니다.

### Computer Science Fundamentals

<ProgressBar name="Computer Science Fundamentals" :max="15" :value="15" />

#### Order and Search
##### Ancient Search Technology

사서는 책을 저자, 제목, 주제별로 찾을 수 있는 방법이 필요했습니다. 하지만 책장에서 책은 한 가지 방법으로만 정렬할 수 있습니다. 사서들은 이 문제를 해결하기 위해 수세기 전에 한 방법을 만들어 냈습니다. 바로 **카드 카탈로그**를 이용하는 것입니다.

<ImageWithCaption src="https://i.imgur.com/VGDRMvc.jpg" alt="card-catalog">
  <template v-slot:figcaption>
    <a href="https://brilliant.org/courses/computer-science-essentials/" target="_blank">출처 : Brilliant</a>
  </template> 
</ImageWithCaption>

<br>

카드 카탈로그의 **색인** 카드는 해당 책을 빠르게 찾을 수 있는 번호를 포함해 책에 대한 모든 주요 정보를 포함하고 있습니다.  만약 카드를 저자별로 묶어놓는다면 우리가 톨스토이의 책을 찾으려고 할 때 빠르게 찾을 수 있습니다. 저자에 따른 정렬만이 아니라 제목, 출판일 등등 도서관을 이용객에게 중요한 정보별로 어떤 것이든 이용할 수 있습니다.

일반적으로 컴퓨터를 이용해 아주 많은 양의 데이터를 검색해야할 때, 아래 두 가지 방법 중 하나를 수행하게 됩니다.

- 모든 데이터를 하나씩 탐색하는 것. 컴퓨터는 이 작업을 아주 빠르게 수행할 수 있습니다. 특히, 병렬로 작업을 수행할 때요.
- 별도의 목록을 탐색하는 것 - 즉, **Index** - 유용한 순서로 정렬돼있습니다. 마치 카드 카탈로그처럼요.

##### Where Should We Put Books?

또 다른 문제

만약 책장에 책이 꽉 차있는데, 중간에 다른 책을 추가해야한다면? 많은 책을 움직여야 합니다.

이 문제를 해결하기 위해 사서들은 책장에 추가적인 공간을 남겨두는 방식을 사용합니다.

하지면 여전히 문제는 존재합니다. 남겨둔 공간이 낭비되는 것이죠.

##### Who Cares Where We put the Books?

공간을 절약할 수 있는 또 다른 현대적인 방법이 있습니다.

책을 아무곳에나 두는 겁니다. 컴퓨터 시스템만이 책의 장소를 기억하는 거죠.

#### Naming

이 것이 우리 시스템의 주요 문제점입니다. 이름을 알기 위해서는 이름을 알아야합니다.

Beemesh 시스템은 모든 디바이스가 생산될 때부터 central authority의 주소를 알도록 했습니다. 컴퓨터가 제일 처음 Beemesh에 연결될 때 이미 `TOWN-HALL`의 주소를 알고 있게 되는 것이죠.

사실, 이건 인터넷이 작동하는 방식과 매우 흡사합니다. 우리의 컴퓨터는 인터넷에 연결되기 전부터 central naming authority의 주소를 알고 있습니다.

#### Abstraction

시청의 컴퓨터를 작동시키는 비용은 1시간에 2센트입니다. 이 계산에 따르면 Sophia의 느린 Python 프로그램을 900번 돌리는 비용은 35센트입니다.

Sophia의 시급은 50달러입니다. 그리고 Sophia가 더 빠른 알고리즘으로 프로그램을 개선하는데는 2시간이 걸립니다.

프로그램 개선이 더 저렴한 방법이 되기 위해서는 프로그램을 몇번이나 돌려야할까요?

#### Interfaces

Jing 시장의 요청을 수행하기 위한 3가지 다른 방법을 알아봤습니다. 하지만 Jing 시장의 입장에서는 이 셋이 모두 같은 **Interface**를 가지고 있었습니다. 그녀는 항상 Records Office를 통해 Fire Department 메모들을 요청했을 뿐이었습니다.

Jing 시장에게서 감춰진 영역이 있어서 신경쓰이게 하지 않고 다른 방법을 사용하도록 바꿀 수 있었습니다. 인터페이스에서 중요한 부분 중 하나입니다.

### Algorithm Fundamentals

<ProgressBar name="Algorithm Fundamentals" :max="100" :value="0" />

### Data Structures

<ProgressBar name="Data Structures" :max="100" :value="0" />

### Introduction to Neural Networks

<ProgressBar name="Introduction to Neural Networks" :max="100" :value="0" />