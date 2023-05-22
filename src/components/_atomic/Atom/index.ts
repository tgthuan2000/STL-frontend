import Amount from './Amount'
import BudgetListSkeleton from './BudgetListSkeleton'
import Date from './Date'
import Description from './Description'
import Dot from './Dot'
import EmptyList from './EmptyList'
import RecentListSkeleton from './RecentListSkeleton'
import SimpleListSkeleton from './SimpleListSkeleton'
import SmallStatisticListSkeleton from './SmallStatisticListSkeleton'
import Title from './Title'

const Atom = () => {}

Atom.Amount = Amount
Atom.Date = Date
Atom.Description = Description
Atom.Dot = Dot
Atom.Title = Title
Atom.EmptyList = EmptyList
Atom.SimpleListSkeleton = SimpleListSkeleton
Atom.BudgetListSkeleton = BudgetListSkeleton
Atom.RecentListSkeleton = RecentListSkeleton
Atom.SmallStatisticListSkeleton = SmallStatisticListSkeleton

export default Atom
