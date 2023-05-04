---
feArticle: true
---

# iOS 및 iPadOS의 웹 앱용 웹 푸시

> 원문: https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/

오늘 iOS 및 iPadOS 16.4 베타 1이 출시되었으며, 홈 화면 웹 앱에 대한 웹 푸시 및 기타 기능이 지원됩니다.

![https://webkit.org/wp-content/uploads/Web_Push_on_iOS-1024x576.png](https://webkit.org/wp-content/uploads/Web_Push_on_iOS-1024x576.png)

오늘 사파리 16.4의 첫 번째 베타 버전도 출시됩니다. 이번 버전은 정규표현식 후방탐색, Import Maps, 오프스크린 캔버스, 미디어 쿼리 범위 지정, `@property`, `font-size-adjust`, 선언적 쉐도우 DOM 등 135개 이상의 기능이 포함된 대규모 릴리즈입니다. 이러한 새로운 WebKit 기능에 대한 자세한 내용은 사파리 16.4가 공개될 때 작성하겠습니다. 한편, 새로운 기능 및 수정 사항의 종합적인 목록은 [사파리 16.4 베타 1 릴리즈 노트](https://developer.apple.com/documentation/safari-release-notes/safari-16_4-release-notes)에서 확인할 수 있습니다. 

사파리는 잠시 제쳐두고 iOS 및 iPadOS의 홈 화면 웹 앱에 관해 이야기해 보겠습니다.

최초의 아이폰부터, 사용자는 브로슈어 사이트, 블로그, 신문, 온라인 상점, 소셜 미디어 플랫폼, 스트리밍 비디오 사이트, 생산성 소프트웨어, 아트워크 제작용 앱 등 모든 웹 사이트를 홈 화면에 추가할 수 있었습니다. 지난 10년 동안 iOS 및 iPadOS의 사파리 사용자는 공유 버튼을 탭 하여 공유 메뉴를 연 다음 '홈 화면에 추가'를 탭 하면 이 작업을 수행할 수 있었습니다. 그럼, 해당 웹사이트의 아이콘이 홈 화면에 나타나게 되고, 이 아이콘을 빠르게 탭해서 해당 사이트로 돌아갈 수 있습니다.

웹 개발자는 [매니페스트 파일](https://developer.mozilla.org/en-US/docs/Web/Manifest)([`display`](https://developer.mozilla.org/en-US/docs/Web/Manifest/display) 멤버를 `standalone` 또는 `fullscreen`으로 설정해야 합니다.)을 생성하여 웹사이트와 함께 제공할 수 있습니다. 그렇게 하면 해당 사이트는 홈 화면 웹 앱이 됩니다. 그런 다음 해당 아이콘을 탭 하면 웹 앱이 브라우저에서 열리지 않고 iOS 또는 iPadOS의 다른 앱처럼 열립니다. 사파리나 다른 브라우저와는 별도로 [앱 스위처](https://support.apple.com/en-us/HT202070)에서 앱 미리보기를 볼 수 있습니다.

## **홈 화면 웹 앱용 웹 푸시 추가**

iOS 및 iPadOS 16.4 베타 1에서 홈 화면 웹 앱에 웹 푸시 기능이 추가되었습니다. 웹 푸시는 웹 개발자가 [푸시 API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API), [알림 API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API), [서비스 워커](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)를 모두 연동하여 사용자에게 푸시 알림을 보낼 수 있도록 해줍니다.

홈 화면에 추가된 웹 앱은 웹 앱에서 제공하는 '구독' 버튼을 탭 하는 등 사용자의 직접적인 상호 작용에 대한 응답으로 푸시 알림 수신 권한을 요청할 수 있습니다. 그러면 iOS 또는 iPadOS는 사용자에게 웹 앱에 알림 전송 권한을 부여할지 묻는 메시지를 표시합니다. 허용되면 사용자는 iPhone 및 iPad의 다른 앱과 마찬가지로 알림 설정에서 [웹 앱별로 해당 권한을 관리](https://support.apple.com/en-us/HT201925)할 수 있습니다.

웹 앱의 알림은 다른 앱의 알림과 똑같이 작동합니다. 알림은 잠금 화면, 알림 센터 및 페어링 된 애플 워치에 표시됩니다.

이는 작년 가을 macOS Ventura용 [Safari 16.1](https://webkit.org/blog/13399/webkit-features-in-safari-16-1/#web-push-for-macos-ventura)에 추가된 것과 동일한 W3C 표준 기반 웹 푸시입니다. 브라우저 감지 대신 기능 감지를 사용하는 등 모범 사례에 따라 웹 앱에 표준 기반 웹 푸시를 구현한 경우 iPhone 및 iPad에서 자동으로 작동합니다.

iOS 및 iPadOS의 웹 푸시는 모든 애플 디바이스에서 네이티브 푸시를 지원하는 동일한 애플 푸시 알림 서비스를 사용합니다. 애플 개발자 프로그램의 회원이 아니어도 사용할 수 있습니다. 서버 푸시 엔드포인트를 제어하고 있는 경우 `*.push.apple.com`의 URL을 허용하기만 하면 됩니다.

웹 푸시 설정 방법에 대해 자세히 알아보려면 webkit.org에서 [웹 푸시 만나기](https://webkit.org/blog/12945/meet-web-push/) 문서를 참조하거나 WWDC22 세션 비디오 [웹 푸시 만나기](https://developer.apple.com/videos/play/wwdc2022/10098/)를 시청하세요.

## **집중 모드 지원**

알림은 강력한 도구이지만, 너무 많은 알림에 압도당하는 상황에 빠지기 쉽습니다. iPhone 및 iPad의 홈 화면 웹 앱에 대한 알림은 [집중 모드](https://support.apple.com/en-us/HT212608)와 통합되어 사용자가 언제 어디서 알림을 받을지 정확하게 설정할 수 있도록 합니다. 두 대 이상의 iOS 또는 iPadOS 장치에서 동일한 웹 앱을 홈 화면에 추가한 사용자의 경우 집중 모드가 모든 장치에 자동으로 적용됩니다.

## **배지 API**

iOS 및 iPadOS 16.4 베타 1의 홈 화면 웹 앱은 이제 [배지 API](https://developer.mozilla.org/en-US/docs/Web/API/Badging_API)를 지원합니다. iOS 및 iPadOS의 다른 앱과 마찬가지로 이제 웹 앱에서도 배지 수를 설정할 수 있습니다. `setAppBadge`와 `clearAppBadge`는 사용자가 웹 앱을 포어그라운드에서 열어두거나 웹 앱이 백그라운드에서 푸시 이벤트를 처리하는 동안, 즉 배지 수를 표시할 수 있는 권한이 부여되기 전에도 배지 수를 변경할 수 있습니다.

앱 아이콘에 배지를 표시할 수 있는 권한은 iOS 및 iPadOS의 다른 앱과 똑같은 방식으로 부여됩니다. 사용자가 알림을 허용하는 권한을 부여하면 홈 화면의 아이콘에 현재 배지 수가 즉시 표시됩니다. 그런 다음 사용자는 iOS 또는 iPadOS의 다른 앱과 마찬가지로 알림 설정에서 배지에 대한 권한을 구성할 수 있습니다.

## **매니페스트 ID**

iOS 및 iPadOS용 WebKit 16.4 베타 1은 웹 애플리케이션 매니페스트 표준의 [ID 멤버](https://developer.mozilla.org/en-US/docs/Web/Manifest/id)에 대한 지원을 추가합니다. 이는 웹 애플리케이션의 고유 식별자 역할을 하는 문자열(URL 형태)로, OS에서 원하는 방식으로 사용하기 위한 것입니다. iOS 및 iPadOS는 여러 기기에서 집중 모드 설정을 동기화할 목적으로 매니페스트 ID를 사용합니다.

iOS는 처음부터 동일한 웹 앱의 다중 설치를 지원해 왔습니다. 하나의 웹 앱을 기기에 두 번 이상 설치할 수 있는 기능은 여러 계정을 지원하고 업무용과 개인용을 구분하는 등의 추가적인 유연성을 제공하는 등 유용할 수 있다고 생각합니다.

홈 화면에 웹 앱을 추가할 때 사용자에게 앱 이름을 변경할 기회가 주어집니다. iOS 및 iPadOS 16.4 베타 1에서는 이 이름을 매니페스트 ID와 결합하여 웹 앱을 고유하게 식별할 수 있습니다. 이렇게 하면 사용자가 하나의 디바이스에 여러 개의 웹 앱 사본을 설치하고 각 사본에 서로 다른 ID를 부여할 수 있습니다. 예를 들어, 'Shiny(개인용)'의 알림은 집중 모드에서 무음으로 설정하고 'Shiny(업무용)'의 알림은 허용할 수 있습니다. 사용자가 여러 장치에서 즐겨 찾는 웹사이트에 동일한 이름을 지정하면 한 장치의 집중 모드 설정이 동기화되어 다른 장치에도 적용됩니다.

## **홈 화면 추가를 위한 타사 브라우저 지원**

iOS 및 iPadOS 16.4 베타 1에서는 이제 타사 브라우저에서도 공유 메뉴에서 웹사이트 및 웹 앱을 홈 화면에 추가할 수 있는 기능을 사용자에게 제공할 수 있습니다.

iOS 및 iPadOS의 애플리케이션은 `activityItems` 배열이 있는 `UIActivityViewController`를 생성하여 공유 메뉴를 표시합니다. 공유 메뉴에 '홈 화면에 추가'가 포함되려면 다음 조건을 만족해야 합니다.

1. 응용 프로그램에는 [com.apple.developer.web-browser](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_web-browser) 관리 권한이 있어야 합니다.
2. `activityItems` 배열에 WKWebView가 포함되어 있어야 합니다.
3. WKWebView가 HTTP 또는 HTTPS URL이 있는 문서를 표시하고 있어야 합니다.
4. 장치가 iPad인 경우 [공유 iPad](https://support.apple.com/ko-kr/guide/deployment/dep9a34c2ba2/web)로 구성되지 않아야 합니다.

위에서 설명한 대로 사용자가 홈 화면에 추가한 후 `display` 멤버를 `standalone` 또는 `fullscreen`으로 설정하는 매니페스트 파일이 있는 모든 웹사이트는 사용자가 해당 아이콘을 탭 하면 웹 앱으로 열립니다. 이는 웹사이트를 홈 화면에 추가한 브라우저와 관계없이 마찬가지입니다.

웹 앱 동작을 요청하도록 구성된 매니페스트 파일이 없는 경우(그리고 사이트를 웹 앱 가능으로 표시하는 `meta` 태그가 없는 경우) 해당 웹사이트는 홈 화면 북마크로 저장됩니다. iOS 및 iPadOS 16.4 베타 1부터 홈 화면 북마크는 사용자의 현재 기본 브라우저에서 열립니다.

## **새로운 대체 아이콘**

웹 개발자는 일반적으로 브라우저의 인터페이스 전체에 웹사이트를 나타내는 아이콘을 제공합니다. 홈 화면의 아이콘이 제공되지 않는 경우 이전에는 iOS 및 iPadOS에서 사이트의 스크린샷으로 아이콘을 만들었습니다. 이제 iOS 및 iPadOS 16.4 베타 1에서는 사이트 이름의 첫 글자와 사이트의 색상을 사용하여 모노그램 아이콘을 생성하고 표시합니다.

웹사이트 또는 웹 앱에 사용할 아이콘을 제공하려면 [매니페스트 파일에 아이콘을 나열](https://developer.mozilla.org/en-US/docs/Web/Manifest/icons)하면 되는데, 이는 [iOS 및 iPadOS 15.4부터](https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/#web-apps) 지원된 기능입니다. 또는 오랫동안 지원되어 온 기법인 HTML 문서 `head`에 `apple-touch-icons`을 나열하는 방법을 사용할 수 있습니다. (두 가지 방법을 모두 사용하는 경우 `apple-touch-icon`이 매니페스트에 선언된 아이콘보다 우선합니다.)

## **웹 앱을 위한 새로운 웹 API**

웹 푸시, 배지 API, 매니페스트 ID 외에도 iOS 및 iPadOS 16.4 베타 1용 Webkit의 다른 많은 새로운 기능은 홈 화면 웹 앱에 중점을 둔 웹 앱 개발자에게 특히 흥미로울 것입니다. 여기에는 다음 사항들이 포함됩니다.

- [화면 깨우기 잠금 API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API)
- [화면 방향 API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Orientation_API)
- [사용자 활성화 API](https://developer.mozilla.org/en-US/docs/Web/API/UserActivation)
- [웹 코덱 API](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API) 비디오 지원

전체 기능 목록은 [사파리 16.4 베타 1](https://developer.apple.com/documentation/safari-release-notes/safari-16_4-release-notes)의 릴리즈 정보를 참조하세요.