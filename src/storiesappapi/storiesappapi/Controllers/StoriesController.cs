using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using storiesappapi.Entities;

namespace storiesappapi.Controllers
{


    //[EnableCors("MyPolicy")]
    [Produces("application/json")]
    [Route("api/Stories")]
    public class StoriesController : ControllerBase
    {
        private readonly StoriesDBContext _context;

        public StoriesController(StoriesDBContext context)
        {
            _context = context;
        }

        // GET: api/Stories
        [HttpGet]
        public async Task<IActionResult> GetStories()
        {
            var stories = await _context.stories.ToListAsync();
            return Ok(stories);
        }

        // GET: api/Stories/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStories([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stories = await _context.stories.SingleOrDefaultAsync(m => m.id == id);

            if (stories == null)
            {
                return NotFound();
            }

            return Ok(stories);
        }

        // PUT: api/Stories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStories([FromRoute] int id, [FromBody] stories stories)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != stories.id)
            {
                return BadRequest();
            }

            _context.Entry(stories).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoriesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        // PUT: api/Stories/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchStories([FromRoute] int id, [FromBody] stories stories)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != stories.id)
            {
                return BadRequest();
            }

            _context.Entry(stories).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoriesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        // POST: api/Stories
        [HttpPost]
        public async Task<IActionResult> PostStories([FromBody] stories stories)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.stories.Add(stories);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStories", new { id = stories.id }, stories);
        }

        // DELETE: api/Stories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStories([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stories = await _context.stories.SingleOrDefaultAsync(m => m.id == id);
            if (stories == null)
            {
                return NotFound();
            }

            _context.stories.Remove(stories);
            await _context.SaveChangesAsync();

            return Ok(stories);
        }

        private bool StoriesExists(int id)
        {
            return _context.stories.Any(e => e.id == id);
        }
    }
}
