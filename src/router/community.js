/* Import views. */
import Blockchain from '@/views/Community/Blockchain'
import Discussions from '@/views/Community/Discussions'
import Events from '@/views/Community/Events'
import Markets from '@/views/Community/Markets'
import Privacy from '@/views/Community/Privacy'
import News from '@/views/Community/News'

/* Initialize routes. */
const routes = [
    {
        path: '/blockchain',
        component: Blockchain
    },
    {
        path: '/discussions',
        component: Discussions
    },
    {
        path: '/events',
        component: Events
    },
    {
        path: '/markets',
        component: Markets
    },
    {
        path: '/privacy',
        component: Privacy
    },
    {
        path: '/news',
        component: News
    },
]

/* Export routes. */
export default routes
