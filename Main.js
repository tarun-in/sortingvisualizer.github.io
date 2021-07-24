let container = document.querySelector('.array');


function generateArray(size) {
    let blocks = document.querySelector('.block');
    while (container.firstChild)
        container.removeChild(container.firstChild);

    for (let i = 0; i < size; ++i) {

        let val = Math.ceil(Math.random() * 100);

        let array_ele = document.createElement('div');
        array_ele.classList.add('block');

        array_ele.style.height = `${val * 3}px`;
        array_ele.style.transform = `${i * 30}px`;

        let array_label = document.createElement('label');
        array_label.classList.add('block_id');
        array_label.innerText = val;



        array_ele.appendChild(array_label);
        container.appendChild(array_ele);
    }
}


async function InsertionSort() {
    let blocks = document.querySelectorAll('.block');

    // blocks[0].style.backgroundColor = 'rgb(49, 226, 13)';
    for (let i = 1; i < blocks.length; ++i) {

        let j = i - 1;

        let key = parseInt(blocks[i].childNodes[0].innerText);
        let height = blocks[i].style.height;

        blocks[i].style.backgroundColor = 'darkblue';

        //to pause code execution for 600 milliseconds
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 600)
        });

        //placing the selected element at it's correct position
        while (j >= 0 && parseInt(blocks[j].innerText) > key) {

            blocks[j].style.backgroundColor = 'darkblue';

            blocks[j + 1].style.height = blocks[j].style.height;
            blocks[j + 1].childNodes[0].innerText = blocks[j].childNodes[0].innerText;

            j--;

            //wait for 600 ms
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 600)
            });

            //  Provide light green color to sorted part
            for (let k = i; k >= 0; --k) {
                blocks[k].style.backgroundColor = 'rgb(49, 226, 13)';
            }

        }

        //placing the selected element to it's correct position
        blocks[j + 1].style.height = height;
        blocks[j + 1].childNodes[0].innerText = key;

        //To pause for 600mx
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 600)
        });

        //  Providing light green color to the ith bar 
        blocks[i].style.backgroundColor = 'rgb(49, 226, 13)';
    }
}





async function BubbleSort() {


    function swap(block1, block2) {
        return new Promise((resolve, reject) => {
            let temp = block1.style.transform;
            block1.style.transform = block2.style.transform;
            block2.style.transform = temp;

            // console.log('swap');

            window.requestAnimationFrame(function () {
                setTimeout(() => {
                    container.insertBefore(block2, block1);

                    resolve();
                }, 250);
            })
        });
    }

    async function bubblesort() {
        let blocks = document.querySelectorAll('.block');

        for (let i = 0; i < blocks.length; ++i) {
            for (let j = 0; j < blocks.length - i - 1; ++j) {

                blocks[j].style.backgroundColor = '#FF4949';
                blocks[j + 1].style.backgroundColor = '#FF4949';

                //   to wait for 0.1 seconds
                await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 100);
                });


                let val1 = Number(blocks[j].childNodes[0].innerText);
                let val2 = Number(blocks[j + 1].childNodes[0].innerText);

                if (val1 > val2) {
                    await swap(blocks[j], blocks[j + 1]);

                    blocks = document.querySelectorAll('.block');

                }

                blocks[j].style.backgroundColor = '#6b5b95';
                blocks[j + 1].style.backgroundColor = '#6b5b95';

            }
            blocks[blocks.length - i - 1].style.backgroundColor = '#13CE66';
        }
    }
    await bubblesort();
}






async function SelectionSort() {


    function swap(block1, block2) {
        block1.style.backgroundColor = 'blue';
        block2.style.backgroundColor = 'blue';

        // await new Promise((resolve , reject)=>{
        //     setTimeout(()=>{
        //         resolve();
        //     } , 500);
        // });

        let block1_height = block1.style.height;
        let block2_height = block2.style.height;

        block1.style.height = block2_height;
        block2.style.height = block1_height;

        let text = block1.childNodes[0].innerText;
        block1.childNodes[0].innerText = block2.childNodes[0].innerText;
        block2.childNodes[0].innerText = text;

    }




    async function selectionSort() {
        let blocks = document.querySelectorAll('.block');

        for (let i = 0; i < blocks.length; ++i) {
            let curr_block = i;
            let curr_value = parseInt(blocks[curr_block].childNodes[0].innerText);
            blocks[curr_block].style.backgroundColor = 'darkblue';

            // pause for 600 ms 
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 600);
            });

            let min_element_index = i; let minimum_so_far = curr_value;
            for (let j = i + 1; j < blocks.length; ++j) {
                let mn_value = parseInt(blocks[j].childNodes[0].innerText);

                blocks[j].style.backgroundColor = 'brown';

                if (minimum_so_far > mn_value) {
                    minimum_so_far = mn_value;


                    blocks[min_element_index].style.backgroundColor = '#6b5b95';

                    min_element_index = j;
                    // console.log('Minimum is ' + blocks[min_element_index].innerText);
                }

                await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 600)
                });

                blocks[j].style.backgroundColor = '#6b5b95';

                blocks[min_element_index].style.backgroundColor = 'red';
            }

            if (curr_value > minimum_so_far) {
                swap(blocks[curr_block], blocks[min_element_index]);
            }
            for (let k = 0; k <= i; ++k) {
                blocks[k].style.backgroundColor = 'green';
            }
        }
    }
    await selectionSort();
}




async function MergeSort() {
    let blocks = document.querySelectorAll('.block');
    let arr = new Array(blocks.length);

    for (let i = 0; i < blocks.length; ++i) {
        arr[i] = parseInt(blocks[i].childNodes[0].innerText);
    }

    function pause(i) {
        return new Promise((resolve) => {
            setTimeout(() => {
                blocks[i].style.height = `${3 * arr[i]}px`;
                blocks[i].style.backgroundColor = 'green';
                blocks[i].childNodes[0].innerText = `${arr[i]}`;
                resolve();
            }, 200);
        });
    }

    // async function timeout(ms){
    //     return new Promise(resolve=>setTimeout(resolve , ms));
    // }

    async function Merge(l, mid, r) {
        let n1 = mid - l + 1;
        let n2 = r - mid;

        let left = new Array(n1);
        let right = new Array(n2);

        for (let i = l; i <= mid; ++i) {
            left[i - l] = arr[i];
        }

        for (let i = mid + 1; i <= r; ++i) {
            right[i - mid - 1] = arr[i];
        }

        let i = 0, j = 0, k = l;

        while (i < n1 && j < n2) {
            if (left[i] <= right[j]) {
                arr[k] = left[i];
                await pause(k);
                i++; k++;


            }
            else {
                arr[k] = right[j];
                await pause(k);
                j++; k++;

            }

        }

        while (i < n1) {
            arr[k] = left[i];
            await pause(k);
            i++; k++;


        }
        while (j < n2) {
            arr[k] = right[j];
            await pause(k);
            j++; k++;


        }

        // for(let i = l; i <= r; ++i){
        //    setTimeout(1000);

        //    await pause(i);

        // }
        return;

    }


    async function mergeSort(l, r) {

        if (l < r) {
            let mid = parseInt((l + r) / 2);
            await mergeSort(l, mid);
            await mergeSort(mid + 1, r);
            await Merge(l, mid, r);



        }
        return;
    }
    await mergeSort(0, arr.length - 1);

}




async function QuickSort() {

    let blocks = document.querySelectorAll('.block');



    function swap(i, j) {

        return new Promise((resolve) => {
            setTimeout(() => {
                let temp = blocks[i].style.height;
                blocks[i].style.height = blocks[j].style.height;
                blocks[j].style.height = temp;

                let temp2 = blocks[i].style.backgroundColor;
                blocks[i].style.backgroundColor = blocks[j].style.backgroundColor;
                blocks[j].style.backgroundColor = temp2;

                let temp3 = blocks[i].childNodes[0].innerText;
                blocks[i].childNodes[0].innerText = blocks[j].childNodes[0].innerText;
                blocks[j].childNodes[0].innerText = temp3;

                resolve();
            }, 200);
        })

    }


    async function partition(l, r) {

        blocks[r].style.backgroundColor = 'brown';
        let pivot_value = parseInt(blocks[r].childNodes[0].innerText);

        let i = l - 1;


        for (let j = l; j < r; ++j) {

            //if current element is smaller tha pivot
            let curr_ele = parseInt(blocks[j].childNodes[0].innerText);


            if (curr_ele < pivot_value) {
                i++;

                await swap(i, j);

            }
        }

        blocks[r].style.backgroundColor = '#6b5b95';


        await swap(i + 1, r);
        blocks[i + 1].style.backgroundColor = 'green';
        return i + 1;
    }


    async function quickSort(l, r) {
        if (l == r) {
            blocks[l].style.backgroundColor = 'green';
        }
        if (l < r) {
            let pi = await partition(l, r);


            await quickSort(l, pi - 1);
            await quickSort(pi + 1, r);
        }
    }
    await quickSort(0, blocks.length - 1);
}






let array_generate = document.querySelector('.generateArray');
array_generate.addEventListener('click', Myfunction);

let array_size = document.querySelector('.size');
array_size.addEventListener('click', getArraySize);

let sizeOfArray = 0;
function getArraySize() {
    sizeOfArray = array_size.value;
    console.log(sizeOfArray);
}

let array_generated = 0;

function Myfunction() {
    sort_array.style.pointerEvents = 'auto';
    generateArray(sizeOfArray);
    array_generated = 1;
}

let sort_array = document.querySelector('.sort');
sort_array.addEventListener('click', SortArray);

let algo_button = document.querySelector('.algo');
algo_button.addEventListener('click', getAlgoValue)

let algo_inprocess = document.querySelector('.algo-inprocess');


let algo = 0;
function getAlgoValue() {
    algo = algo_button.value;
    console.log(algo);
}



async function SortArray() {



    sort_array.style.pointerEvents = 'none';
    console.log('clicked');


    if (algo == 0) {

        algo_inprocess.innerHTML = "Select an Algorithm first!";
        algo_inprocess.style.color = 'red';

    }
    else if (sizeOfArray == 0) {

        algo_inprocess.innerHTML = "Select Array Size!"
        algo_inprocess.style.color = 'red';
    }
    else if (array_generated == 0) {
        algo_inprocess.innerHTML = "Generate Array then Sort!!";
        algo_inprocess.style.color = 'red';
    }
    else if (algo == 1) {
        algo_inprocess.innerHTML = "Algorithm : Bubble Sort";
        algo_inprocess.style.color = 'teal';
        await BubbleSort();
    }
    else if (algo == 2) {
        algo_inprocess.innerHTML = "Algorithm : Selection Sort";
        algo_inprocess.style.color = 'teal';
        await SelectionSort();
    }
    else if (algo == 3) {
        algo_inprocess.innerHTML = "Algorithm : Insertion Sort";
        algo_inprocess.style.color = 'teal';
        await InsertionSort();
    }
    else if (algo == 4) {
        algo_inprocess.innerHTML = "Algorithm : Merge Sort";
        algo_inprocess.style.color = 'teal';
        await MergeSort();
    }
    else if (algo == 5) {
        algo_inprocess.innerHTML = "Algorithm : Quick Sort";
        algo_inprocess.style.color = 'teal';
        await QuickSort();
    }

    sort_array.style.pointerEvents = 'auto';

}


