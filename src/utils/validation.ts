function minLength(min: number) {
    return function (value: string) {
        return value.length >= min ? undefined : `최소 ${min}글자 이상 입력해주세요.`;
    };
}


/** 커링을 이용한 함수(= 인자를 받는 함수를 리턴하는 함수임)
 * - 커링은 함수를 호출할 때, 인자를 하나씩 받아서 원하는 인자가 모두 모이면 함수를 실행하는 기법이다.
 * maxLength(10)은 함수를 반환하고, 그 함수에 value를 넣어주면 된다.
 * 
 * maxLength(10)(value)
 * => value.length <= 10 ? undefined : `최대 10글자 이하로 입력해주세요.`
 */
function maxLength(max: number) {
    return function (value: string) {
        return value.length <= max ? undefined : `최대 ${max}글자 이하로 입력해주세요.`;
    };
}