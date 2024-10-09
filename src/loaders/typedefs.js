/**
 * @typedef {Object} BookLog
 * @property {string} name
 * @property {string} startedAt
 * @property {string=} endAt
 * @property {number} progressValue
 * @property {boolean} inProgress
 * @property {Log[]=} logs
 */

/**
 * @typedef {Object} Log
 * @property {string} date
 * @property {number} progressValue
 */

//// Kakao Search API 책 검색 응답

/**
 * @typedef {Object} Meta
 * @property {number} total_count 검색된 문서 수
 * @property {number} pageable_count 중복된 문서를 제외하고, 처음부터 요청 페이지까지의 노출 가능 문서 수
 * @property {boolean} is_end 현재 페이지가 마지막 페이지인지 여부
 */

/**
 * @typedef {Object} Book
 * @property {string} title 도서 제목
 * @property {string} contents 도서 소개
 * @property {string} url 도서 상세 URL
 * @property {string} isbn ISBN
 * @property {string} datetime 도서 출판날짜
 * @property {string[]} authors 도서 저자 리스트
 * @property {string} publisher 도서 출판사
 * @property {string[]} translators 도서 번역자 리스트
 * @property {number} price 도서 정가
 * @property {number} sale_price 도서 판매가
 * @property {string} thumbnail 도서 표지 미리보기 URL
 * @property {string} status 도서 판매 상태 정보
 */

/**
 * @typedef {Object} BookSearchResponse
 * @property {Meta} meta 응답 관련 정보
 * @property {Book[]} documents 응답 결과
 */
