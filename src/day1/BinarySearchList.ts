import { createVoidZero, getImpliedNodeFormatForFile } from "typescript";

export default function bs_list(arr: number[], target: number): boolean {
    // middle of the array if it is equal to the value we are looking for we return it
    // if the value in the middle is less than the value we are looking for the we change the the left pointer to be the next value to the middle
    // if the value we are looking for is greater than what we are looking for we change the right pointer to be the middle value
    var low = 0;
    var high = arr.length;
    while (low < high){
        // handle shifing the pointers
        // getting the floor the eliminate decimals
        var m = Math.floor(low + (high-low)/2)
        var v = arr[m];
        if(v === target){
            return true;
        }else if(v > target){
            high = m;
        }else {
            low = m+1;
        }
    }
    return false ;
}
