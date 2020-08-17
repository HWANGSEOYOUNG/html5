/**
 * Promise는 프로미스가 생성될 때 꼭 알 수 있지는 않은 값을 위한 대리자로,
 * 비동기 연산이 종료된 이후의 결과값이나 실패 이유를 처리하기 위한 처리기를 연결할 수 있도록 합니다.
 * 프로미스를 사용하면 비동기 메서드에서 마치 동기 메서드처럼 값을 반환할 수 있습니다.
 * 다만 최종 결과를 반환하지는 않고, 대신 프로미스를 반환해서 미래의 어떤 시점에 결과를 제공합니다.

 Promise는 다음 중 하나의 상태를 가집니다.

 대기(pending): 이행하거나 거부되지 않은 초기 상태.
 이행(fulfilled): 연산이 성공적으로 완료됨.
 거부(rejected): 연산이 실패함.
 대기 중인 프로미스는 값과 함께 이행할 수도, 어떤 이유(오류)로 인해 거부될 수 있습니다.
 이행이나 거부될 때, 프로미스에 연결한 처리기는 그 프로미스의 then 메서드에 의해 대기열에 오릅니다.
 이미 이행했거나 거부된 프로미스에 연결한 처리기도 호출하므로, 비동기 연산과 처리기 연결 사이에 경합 조건race condition은 없습니다.

 Promise.prototype.then() 및 Promise.prototype.catch() 메서드의 반환 값은 다른 프로미스이므로, 서로 연결할 수 있습니다.
 * **/


//'use strict';
var promiseCount = 0;

function testPromise() {
    var thisPromiseCount = ++promiseCount;

    var log = document.getElementById('log');
    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') 시작 (<small>동기적 코드 시작</small>)<br/>');

    // 새 프로미스 생성 - 프로미스의 생성 순서를 전달하겠다는 약속을 함 (3초 기다린 후)
    var p1 = new Promise(
        // 실행 함수는 프로미스를 이행(resolve)하거나
        // 거부(reject)할 수 있음
        function(resolve, reject) {
            log.insertAdjacentHTML('beforeend', thisPromiseCount +
                ') 프로미스 시작 (<small>비동기적 코드 시작</small>)<br/>');
            // setTimeout은 비동기적 코드를 만드는 예제에 불과
            window.setTimeout(
                function() {
                    // 프로미스 이행 !
                    resolve(thisPromiseCount);
                }, Math.random() * 2000 + 1000);
        }
    );

    // 프로미스를 이행했을 때 할 일은 then() 호출로 정의하고,
    // 거부됐을 때 할 일은 catch() 호출로 정의
    p1.then(
        // 이행 값 기록
        function(val) {
            log.insertAdjacentHTML('beforeend', val +
                ') 프로미스 이행 (<small>비동기적 코드 종료</small>)<br/>');
        })
        .catch(
            // 거부 이유 기록
            function(reason) {
                console.log('여기서 거부된 프로미스(' + reason + ')를 처리하세요.');
            });

    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') 프로미스 생성 (<small>동기적 코드 종료</small>)<br/>');
}