#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> numbers = {1, 2, 3};
  int in;
  cin >> in;
  numbers.push_back(in);
  int left = 0, right = numbers.size() - 1;
  while(left < right) {
    swap(numbers[left], numbers[right]);
    left++;
    right--;
  }

  for (int x : numbers) {
    cout << x << " ";
  }

  cout << endl;
  cout << "size:" << numbers.size() << endl;
  return 0;
}